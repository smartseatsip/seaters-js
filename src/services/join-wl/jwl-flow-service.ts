import { SessionService } from '../session-service';
import { Promise } from 'es6-promise';
import { ModalService } from '../modal-service';
import { WaitingListService, ExtendedWaitingList, WAITING_LIST_ACTION_STATUS } from '../waiting-list-service';
import { FanGroupService, ExtendedFanGroup, FAN_GROUP_ACTION_STATUS } from '../fan-group-service';
import { Fan } from '../../seaters-api/fan/fan';
import {FanGroup} from "../../seaters-api/fan/fan-group";

declare var require: any;

export enum JWL_EXIT_STATUS {
  JOINED, CANCELLED, ERROR
}

export class JwlFlowService {

    constructor (
        private modalService: ModalService,
        private sessionService: SessionService,
        private waitingListService: WaitingListService,
        private fanGroupService: FanGroupService
    ) {
    }

    /**
     * Extract the message from an error and log this message with it's details
     */
    private extractMsgAndLogError (pre, err): string {
      var message = err instanceof Error ? err.message : JSON.stringify(err);
      var details = err.stack || '';
      console.error('[JwlFlowService] ' + pre + ': ' + message, details);
      return message;
    }

    /**
     * Sets a button to either enabled or disabled
     */
    private enableButton(btnId: string, enabled:boolean) {
      (<HTMLButtonElement>this.modalService.findElementById(btnId)).disabled = !enabled;
    }

    /**
     * Show server side login form errors
     * @param error
     */
    private showFormErrorsApiLogin(error) {
      if (error instanceof String) {
        this.modalService.showFieldError('strs-email-error', 'Oops! Something went wrong. Please contact customer service.');
      } else if (error.details.length > 0) {//Test for detailed errors
        if (error.details[0].field === 'emailPasswordCredentials.email'){
          this.modalService.showFieldError('strs-email-error', error.details[0].error.defaultMessage);
        }
      } else { //Test for general error
        this.modalService.showFieldError('strs-email-error',error.error.defaultMessage);
      }
    }

    /**
     * Returns a promise that never resolves
     */
    private endoftheline<T> () {
      return new Promise<T>(() => null);
    }

    private defer<T> (): { promise: Promise<T>, resolve: (T) => void, reject: (any) => void } {
      var r: any = {};
      r.promise = new Promise<T>((resolve, reject) => {
        r.resolve = resolve;
        r.reject = reject
      });
      return r;
    }

    /**
     * Entry point for the 'Join WL Flow'
     */
    startFlow (wlId: string): Promise<JWL_EXIT_STATUS> {
      return this.ensureFanIsLoggedInWithValidEmail()
      .then(() => this.ensureFanHasJoinedFgAndWl(wlId))
      .then(wl => this.showRankAndLikelihood(wl));
    }

    private ensureFanIsLoggedInWithValidEmail (): Promise<void> {
      console.log('[JwlFlowService] ensuring fan is logged in with valid email');
      var fan = this.sessionService.whoami();
      if (fan) {
        return this.ensureFanHasValidEmail(fan);
      } else {
        return this.showLogin()
        .then((fan) => this.ensureFanHasValidEmail(fan));
      }
    }

    private ensureFanHasJoinedFgAndWl (wlId: string): Promise<ExtendedWaitingList> {
      console.log('[JwlFlowService] ensuring fan has joined FG and WL');
      this.modalService.showModal(
        require('./loading.html'),
        require('./loading.scss'),
      );

      return this.waitingListService.getExtendedWaitingList(wlId)
      .then(wl => {
        return this.fanGroupService.getExtendedFanGroup(wl.groupId)
        .then( fg => { return { fg: fg, wl: wl } })
        .then( data => this.chooseSeats(wl).then(numberOfSeats => {
          return {
            fg: data.fg,
            wl: data.wl,
            numberOfSeats: numberOfSeats
          };
        }));
      })
      .then(data => {
        var wl = data.wl, fg = data.fg;
        return this.ensureFGAndWLAreEligable(fg, wl)
        .then(() => this.joinFanGroupIfNeeded(fg))
        .then(() => this.joinWaitingListIfNeeded(wl, data.numberOfSeats))
      })
    }

    private checkFanGroupEligability (fg: ExtendedFanGroup) {
      return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE ||
        fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_JOIN ||
        fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_UNLOCK
    }

    private checkWaitingListEligability (wl: ExtendedWaitingList) {
      return wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK || this.hasRank(wl);
    }

    private ensureFGAndWLAreEligable (fg: ExtendedFanGroup, wl: ExtendedWaitingList): Promise<void> {
      console.log('[JwlFlowService] ensuring FG and WL are eligable for JWL');
      if (!(this.checkFanGroupEligability(fg) && this.checkWaitingListEligability(wl))) {
        this.modalService.showModal(
          'To join this wish list, visit https://seaters.com/'+fg.slug+'/'+wl.waitingListId,//TODO: make template
          ''
        )
        return this.endoftheline<void>();
      } else {
        return Promise.resolve();
      }
    }

    private showRankAndLikelihood(wl: ExtendedWaitingList): Promise<JWL_EXIT_STATUS> {
      console.log('[JwlFlowService] showing rank and likelihood');
      this.modalService.showModal(
        require('./wl.html'),
        require('./app.css')
      );

      return new Promise<JWL_EXIT_STATUS>((resolve, reject) => {
        var closeBtn = this.modalService.findElementById('strs-btn-close');
        closeBtn.onclick = () => {
          this.modalService.closeModal();
          resolve(JWL_EXIT_STATUS.JOINED);
        };

        var waitingListName = <HTMLElement> this.modalService.findElementById('strs-wl-name');
        waitingListName.innerHTML = wl.displayName;
        var displaySection;

        //TODO: split up different scenario's in different modal contents

        if (wl.waitingListStatus === 'OPEN' && this.hasRank(wl)) {
          displaySection = this.modalService.findElementById('strs-wl-open');
          displaySection.style.display = 'block';
          //set wl group info
          var waitingListLikelihood = <HTMLElement>this.modalService.findElementById('strs-wl-likelihood');
          waitingListLikelihood.innerHTML = wl.position.likelihood+" %";
          var waitingListRank = <HTMLElement>this.modalService.findElementById('strs-wl-rank');
          waitingListRank.innerHTML = "# "+wl.position.rank;
        }
        else if (wl.waitingListStatus === 'CLOSED') {
          displaySection = this.modalService.findElementById('strs-wl-closed');
          displaySection.style.display = 'block';
          //set fan group slug
          var fanGroupSlug = <HTMLAnchorElement>this.modalService.findElementById('strs-fg-slug');
          fanGroupSlug.innerHTML = wl.groupName.en;
          fanGroupSlug.href = "http://www.seaters.com/"+wl.groupSlug;
        }
        //TODO: link to seaters for further actions (soon/pay/preauth/accept/print...)

      });
    }

    private showLogin (): Promise<Fan> {
      // show the log in screen
      this.modalService.showModal(
        require('./login.html'),
        require('./app.css')
      );

      var deferred = this.defer<Fan>();

      // resolve whenever doLogin or showSignup is completed
      var loginBtn = this.modalService.findElementById('strs-btn-login');
      loginBtn.onclick = () => this.doLogin().then(deferred.resolve, deferred.reject);

      var navToSignup = this.modalService.findElementById('strs-nav-signup');
      navToSignup.onclick = (evt) => {
        evt.preventDefault();//TODO: preventDefault at modal level should be enough
        this.showSignup().then(deferred.resolve, deferred.reject);
      };
      return deferred.promise;
    }

    private doLogin(): Promise<Fan> {
      //Reset form errors
      this.modalService.resetFormErrors();

      // Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("strs-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("strs-password")).value;

      // Client-side validation first
      var validationErrors = this.validateLoginForm(email, password);
      if (validationErrors.length > 0) {
        this.modalService.showFormErrors(validationErrors);
        return this.endoftheline();// will come back via another call to doLogin
      }

      //TODO: show/hide loader
      this.enableButton('strs-btn-login',false);
      return this.sessionService.doEmailPasswordLogin(email, password)
      .then(fan => fan, err => {
        this.enableButton('strs-btn-login', true);
        var message = this.extractMsgAndLogError('doLogin', err);
        this.showFormErrorsApiLogin(err);
        return this.endoftheline();// will come back via another call to doLogin
      });
    }

    /**
     * Show client side login form errors
     * @param email
     * @param password
     * @returns {Array}
     */
    private validateLoginForm(email:string, password:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(email)) {
        //validationErrors.push({field:'strs-email', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'strs-password', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-password', error:'Mandatory'});
      }
      return validationErrors;
    }

    private showSignup (): Promise<Fan> {
      // show the signup screen
      this.modalService.showModal(
        require('./signup.html'),
        require('./app.css')
      );
      return new Promise<Fan>((resolve, reject) => {
        var signupBtn = this.modalService.findElementById('strs-btn-signup');
        signupBtn.onclick = () => this.doSignup().then(resolve, reject);
      });
    }

    private doSignup (): Promise<Fan> {
      // Reset form errors
      this.modalService.resetFormErrors();

      // Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("strs-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("strs-password")).value;
      var firstname = (<HTMLInputElement>this.modalService.findElementById("strs-firstname")).value;
      var lastname = (<HTMLInputElement>this.modalService.findElementById("strs-lastname")).value;

      // Client-side validations
      var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
      if (validationErrors.length > 0) {
        this.modalService.showFormErrors(validationErrors);
        return this.endoftheline(); // will come back via another call to doSignup
      }

      this.enableButton('strs-btn-signup',false);
      this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
      .then(fan => fan, err => {
          this.enableButton('strs-btn-signup', true);
          var message = this.extractMsgAndLogError('doSignup', err);
          this.modalService.showFieldError('strs-email-error', message);
          return this.endoftheline();
      });
    }

    private ensureFanHasValidEmail(fan: Fan): Promise<void> {
      if (fan.validatedEmail) {
        return Promise.resolve();
      } else {
        return this.showValidateEmail(fan);
      }
    }

    private showValidateEmail (fan: Fan): Promise<void> {
      this.modalService.showModal(
        require('./validate.html'),
        require('./app.css')
      );

      var deferred = this.defer<void>();

      var userSpan = this.modalService.findElementById('strs-span-firstname');
      userSpan.innerHTML = fan.firstName;

      var validateEmailBtn = this.modalService.findElementById('strs-btn-validate');
      validateEmailBtn.onclick = () => this.doEmailValidation(fan).then(deferred.resolve, deferred.reject);

      return deferred.promise;
    }


    private doProtectedFanGroupValidation(fanGroup: ExtendedFanGroup):  Promise<ExtendedFanGroup> {
      // Reset form errors
      this.modalService.resetFormErrors();

      // Get fields
      var fanGroupCode = (<HTMLInputElement>this.modalService.findElementById("strs-fangroup-code")).value;

      // Client-side validations
      var validationErrors = this.validateProtectedFanGroupValidationForm(fanGroupCode);
      if (validationErrors.length > 0) {
        this.modalService.showFormErrors(validationErrors);
        return this.endoftheline();
      }

      //Verify protection code
      this.enableButton('strs-btn-joinfg',false);
      return this.fanGroupService.joinProtectedFanGroup(fanGroup, fanGroupCode)
        .then(
          (fg) =>  {
            console.log("membership");
            console.log(fg);
            return Promise.resolve(fg)
          }
          ,
          err => {
            this.enableButton('strs-btn-joinfg',true);
            var message = this.extractMsgAndLogError('doProtectedFanGroupValidation', err);
            //TODO better error handling:
            this.modalService.showFieldError('strs-fangroup-code-error',"Invalid code");
            return this.endoftheline();
          });
    }


    private ensureProtectedFanGroupValidated(fanGroup: ExtendedFanGroup): Promise<ExtendedFanGroup> {
      this.modalService.showModal(
        require('./fgcode.html'),
        require('./app.css')
      );

      var deferred = this.defer<ExtendedFanGroup>();

      var fgName = (<HTMLElement>this.modalService.findElementById('strs-span-fangroup-name'));
      fgName.innerHTML = fanGroup.translatedName;

      var joinFgBtn = this.modalService.findElementById('strs-btn-joinfg');
      joinFgBtn.onclick = () => this.doProtectedFanGroupValidation(fanGroup).then(deferred.resolve, deferred.reject);

      return deferred.promise;
    }

    /**
     * Provides and returns a promise for seat selection and start showing the seat selection form
     * @param wl
     * @returns {Promise}
       */
    private chooseSeats (wl: ExtendedWaitingList) : Promise<number> {
      // return immediately for closed WL
      if (wl.waitingListStatus === 'CLOSED')
        return Promise.resolve(0);
      // return immediately if the fan already has a rank
      if (this.hasRank(wl)) {
        return Promise.resolve(wl.position.numberOfSeats);
      }

      // otherwise ask how many he wants
      this.modalService.showModal(
        require('./tickets.html'),
        require('./app.css')
      );

      //Setup select values
      var seat = this.modalService.findElementById('strs-btn-bookseats');
      var seatSelect = <HTMLSelectElement> this.modalService.findElementById('strs-seats');
      for (var i = 0; i < wl.maxNumberOfSeatsPerPosition; i++) {
        var opt = document.createElement('option');
        opt.value = String(i+1);
        opt.innerHTML = String(i+1);
        seatSelect.appendChild(opt);
      }

      var deferred = this.defer<number>();
      var bookSeatsBtn = this.modalService.findElementById('strs-btn-bookseats');
      bookSeatsBtn.onclick = () => {
        var seats = seatSelect.options[seatSelect.selectedIndex].value;
        deferred.resolve(seats);
      };

      return deferred.promise;
    }

    private doEmailValidation(fan): Promise<Fan> {
      // Reset form errors
      this.modalService.resetFormErrors();

      // Get fields
      var confirmationCode = (<HTMLInputElement>this.modalService.findElementById("strs-confirmation-code")).value;
      var email = fan.email;

      // Client-side validations
      var validationErrors = this.validateEmailValidationForm(confirmationCode);
      if (validationErrors.length > 0) {
        this.modalService.showFormErrors(validationErrors);
        return this.endoftheline();
      }

      //Validate
      this.enableButton('strs-btn-validate',false);
      return this.sessionService.doEmailValidation(email, confirmationCode)
      .then(fan => fan, err => {
        this.enableButton('strs-btn-validate',true);
        var message = this.extractMsgAndLogError('doEmailValidation', err);
        //For now, add general always show this error, as error info is in different format coming back
        this.modalService.showFieldError('strs-confirmation-code-error',"Wrong validation code");
        return this.endoftheline();
      });
    }

    ////---------------

    private validateSignupForm(email: string, password:string, firstname:string, lastname:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(email)) {
        //validationErrors.push({field:'strs-email', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'strs-password', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-password', error:'Mandatory'});
      }

      //Test firstname
      if(!this.modalService.validateRequired(firstname)) {
        //validationErrors.push({field:'strs-firstname', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-firstname', error:'Mandatory'});
      }

      //Test lastname
      if(!this.modalService.validateRequired(lastname)) {
        //validationErrors.push({field:'strs-lastname', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-lastname', error:'Mandatory'});
      }
      return validationErrors;
    }

    private validateEmailValidationForm(code:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(code)) {
        //validationErrors.push({field:'strs-confirmation-code', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-confirmation-code', error:'Mandatory'});
      }
      return validationErrors;
    }

    private validateProtectedFanGroupValidationForm(code:string) {
      var validationErrors = [];

      if(!this.modalService.validateRequired(code)) {
        validationErrors.push({field:'strs-fangroup-code', error:'Mandatory'});
      }
      return validationErrors;
    }


    private hasRank (wl: ExtendedWaitingList) {
      return wl.actionStatus === WAITING_LIST_ACTION_STATUS.CONFIRM ||
        wl.actionStatus === WAITING_LIST_ACTION_STATUS.WAIT ||
        wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE;
    }

    private joinWaitingListIfNeeded (wl: ExtendedWaitingList, numberOfSeats:number): Promise<ExtendedWaitingList> {

        //if user has already a position or this is a closed WL, then just continue
        if (this.hasRank(wl) || wl.waitingListStatus === 'CLOSED') {
            return Promise.resolve(wl);
        }
        //otherwise book the WL
        else if (wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK) {
            return this.waitingListService.joinWaitingList(wl.waitingListId, numberOfSeats);
        } else {
            return Promise.reject('Unsupported WL action status: ' + wl.actionStatus);
        }
    }

    private joinFanGroupIfNeeded (fg: ExtendedFanGroup): Promise<ExtendedFanGroup> {
        if (fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE) {
            return Promise.resolve(fg);
        } else if (fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_JOIN) {
            return this.fanGroupService.joinFanGroup(fg.id);
        } else if (fg.actionStatus == FAN_GROUP_ACTION_STATUS.CAN_UNLOCK && fg.accessMode === 'CODE_PROTECTED') {
            return this.ensureProtectedFanGroupValidated(fg);
        }
        else {
            return Promise.reject('Unsupported FG action status: ' + fg.actionStatus);
        }
    }

}
