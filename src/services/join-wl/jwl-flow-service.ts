import { SessionService } from '../session-service';
import { Promise } from 'es6-promise';
import { ModalService } from '../modal-service';
import { WaitingListService, ExtendedWaitingList, WAITING_LIST_ACTION_STATUS } from '../waiting-list-service';
import { FanGroupService, ExtendedFanGroup, FAN_GROUP_ACTION_STATUS } from '../fan-group-service';

declare var require: any;

export class JwlFlowService {

    private wlId: string = "";
    private wl: ExtendedWaitingList;
    private fg: ExtendedFanGroup;

    constructor (
        private modalService: ModalService,
        private sessionService: SessionService,
        private waitingListService: WaitingListService,
        private fanGroupService: FanGroupService
    ) {
    }

    //Sets a button to either enabled or disabled
    private enableButton(btnId: string, enabled:boolean) {
      (<HTMLButtonElement>this.modalService.findElementById(btnId)).disabled = !enabled;
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
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-password', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Show server side login form errors
     * @param error
     */
    private showFormErrorsApiLogin(error) {
      //Test for detailed errors
      if (error.details.length > 0) {
        if (error.details[0].field === 'emailPasswordCredentials.email'){
          this.modalService.showFieldError('strs-email-error', error.details[0].error.defaultMessage);
        }
      }
      //Test for general error
      else {
        this.modalService.showFieldError('strs-email-error',error.error.defaultMessage);
      }
    }

    /**
     * Perform login
     */
    private doLogin() {
      var _this = this;
      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("strs-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("strs-password")).value;

      //..and do client validation first
      var validationErrors = this.validateLoginForm(email, password);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {

        //Login
        this.enableButton('strs-btn-login',false);
        this.sessionService.doEmailPasswordLogin(email, password)
          .then(
            (user) => {
              _this.enableButton('strs-btn-login',true);
              //TODO: TEST for validated email; if not yet, nav to validation form otherwise continue to WL
              _this.checkJoinStatus();
            },
            (err) => {
              _this.enableButton('strs-btn-login',true);
              if(err instanceof Error) {
                console.log('session.doEmailPasswordLogin error', err.stack);//DEBUG
              } else {
                console.log('session.doEmailPasswordLogin error', err);//DEBUG
              }
              _this.showFormErrorsApiLogin(err);
            });
      }
    }


    /**
     * Show client side signup form errors
     * @param email
     * @param password
     * @param firstname
     * @param lastname
     * @returns {Array}
     */
    private validateSignupForm(email: string, password:string, firstname:string, lastname:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(email)) {
        //validationErrors.push({field:'sl-email', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-password', error:'Mandatory'});
      }

      //Test firstname
      if(!this.modalService.validateRequired(firstname)) {
        //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-firstname', error:'Mandatory'});
      }

      //Test lastname
      if(!this.modalService.validateRequired(lastname)) {
        //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-lastname', error:'Mandatory'});
      }
      return validationErrors;
    }

    /**
     * Perform signup
     */
    private doSignup() {
      var _this = this;

      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var email = (<HTMLInputElement>this.modalService.findElementById("strs-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("strs-password")).value;
      var firstname = (<HTMLInputElement>this.modalService.findElementById("strs-firstname")).value;
      var lastname = (<HTMLInputElement>this.modalService.findElementById("strs-lastname")).value;

      //..and do client validation first
      var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Login
        this.enableButton('strs-btn-signup',false);
        this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
          .then(
            (userAfterSignup) => {
            //Now signin - after signin, continue with email validation
            _this.sessionService.doEmailPasswordLogin(email, password).then(userAfterLogin => _this.setupEmailValidation(userAfterLogin));
            },
            (err) => {
              _this.enableButton('strs-btn-signup',true);
              if(err instanceof Error) {
                console.log('session.doEmailPasswordSignUp error', err.stack);//DEBUG
              }
              else {
                console.log('session.doEmailPasswordSignUp error', err);//DEBUG
              }
              _this.modalService.showFieldError('strs-email-error',err.message);
            });
      }
    }

    /**
     * Show client side validate form errors
     * @param code
     * @returns {Array}
     */
    private validateEmailValidationForm(code:string) {
      var validationErrors = [];

      //Test email
      if(!this.modalService.validateRequired(code)) {
        //validationErrors.push({field:'sl-confirmation-code', error:'sl_input_err_required'});
        validationErrors.push({field:'strs-confirmation-code', error:'Mandatory'});
      }
      return validationErrors;
    }

  /**
     * Perform email validation
     */
    private doEmailValidation(userData) {
      var _this = this;

      //Reset form errors
      this.modalService.resetFormErrors();

      //Get fields
      var confirmationCode = (<HTMLInputElement>this.modalService.findElementById("strs-confirmation-code")).value;
      var email = userData.email;

      //..and do client validation first
      var validationErrors = this.validateEmailValidationForm(confirmationCode);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Validate
        this.enableButton('strs-btn-validate',false);
        this.sessionService.doValidation(email, confirmationCode)
          .then(
            res =>_this.checkJoinStatus()
          , (err) => {
            _this.enableButton('strs-btn-validate',true);
            if(err instanceof Error) {
              console.log('session.doValidation error', err.stack);//DEBUG
            } else {
              console.log('session.doValidation error', err.stack);//DEBUG
            }

            //For now, add general always show this error, as error info is in different format coming back
            _this.modalService.showFieldError('strs-confirmation-code-error',"Wrong validation code");
          });

      }
    }

    setupEmailValidation (userData) {
      this.modalService.showModal(
        require('./validate.html'),
        require('./app.css')
      );
      var validateEmailBtn = this.modalService.findElementById('strs-btn-validate');
      validateEmailBtn.onclick = () => this.doEmailValidation(userData);
      var userSpan = this.modalService.findElementById('strs-span-firstname');
      userSpan.innerHTML = userData.name.firstName;
    }


    /**
     * Provides and returns a promise for seat selection and start showing the seat selection form
     * @param wl
     * @returns {Promise}
       */
    private chooseSeats (wl: ExtendedWaitingList) : Promise<number> {
      var seatSelectionResolver, promise = new Promise(function (resolve, reject) {
        seatSelectionResolver = resolve;
      });
      //Show the seat selection form first
      this.setupSeatsSelection(wl.maxNumberOfSeatsPerPosition, seatSelectionResolver);
      return promise;
    }

    /**
     * Setup the seat selection form
     * @param maxSeats
     * @param seatSelectionResolver
       */
    setupSeatsSelection (maxSeats: number, seatSelectionResolver)  {
      var _this = this;
      this.modalService.showModal(
        require('./tickets.html'),
        require('./app.css')
      );

      //Setup select values
      var seat = this.modalService.findElementById('strs-btn-bookseats');
      var seatSelect = <HTMLSelectElement> _this.modalService.findElementById('strs-seats');
      for (var i=0;i < maxSeats; i++) {
        var opt = document.createElement('option');
        opt.value = String(i+1);
        opt.innerHTML = String(i+1);
        seatSelect.appendChild(opt);
      }

      var bookSeatsBtn = this.modalService.findElementById('strs-btn-bookseats');
      bookSeatsBtn.onclick = () => {
        var seats = seatSelect.options[seatSelect.selectedIndex].value;
        seatSelectionResolver(Promise.resolve(seats))
      };
    }

    setupSignup () {
      this.modalService.showModal(
        require('./signup.html'),
        require('./app.css')
      );
      var signupBtn = this.modalService.findElementById('strs-btn-signup');
      signupBtn.onclick = () => this.doSignup();
    }

    /**
     *  Setup login
     */
    setupLogin () {
      this.modalService.showModal(
        require('./login.html'),
        require('./app.css')
      );
      var loginBtn = this.modalService.findElementById('strs-btn-login');
      loginBtn.onclick = () => this.doLogin();
      var navToSignup = this.modalService.findElementById('strs-nav-signup');
      navToSignup.onclick = (evt) => { evt.preventDefault(); this.setupSignup()};
    }

    private checkFanGroupEligability (fg: ExtendedFanGroup) {
      return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE ||
        fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_JOIN;
    }

    private setupLinkToSeatersIfNotEligable () {
      this.modalService.showModal(
        'To join this wish list, visit https://seaters.com/'+this.fg.slug+'/'+this.wlId,//TODO: make template
        ''
      )
    }

    private checkJoinStatus () {
      this.modalService.showModal(
        'loading ...',//TODO: make template
        ''
      );

      return this.waitingListService.getExtendedWaitingList(this.wlId)
      .then(wl => this.wl = wl)
      .then(() => this.fanGroupService.getExtendedFanGroup(this.wl.groupId))
      .then(fg => this.fg = fg)
      .then(() => {
        var fg = this.fg, wl = this.wl;

        if (!this.checkFanGroupEligability(fg)) {
          return this.setupLinkToSeatersIfNotEligable();
        } else if (this.hasRank(wl)) {
          return this.setupWaitingListInfo();
        } else {
          return this.joinFanGroupIfNeeded(fg)
          .then(fg => this.fg = fg)
          .then( () => this.chooseSeats(wl) )
          .then((numberOfSeats) => this.joinWaitingListIfNeeded(wl, numberOfSeats))
          .then(wl => this.wl = wl)
          .then(() => this.setupWaitingListInfo());
        }
      });
    }


    /**
     * Show WL info
     *
     */
    private showWaitingListInfo() {
      var _this = this;

      this.waitingListService.getExtendedWaitingList(this.wlId)
      .then(function(wl) {

          //TODO: - handle no position situation -> auto join wl

          var waitingListName = <HTMLElement>_this.modalService.findElementById('strs-wl-name');
          waitingListName.innerHTML = wl.displayName;
          var displaySection;

          if (wl.waitingListStatus === 'OPEN' && wl.position) {
            displaySection = _this.modalService.findElementById('strs-wl-open');
            displaySection.style.display = 'block';
            //set wl group info
            var waitingListLikelihood = <HTMLElement>_this.modalService.findElementById('strs-wl-likelihood');
            waitingListLikelihood.innerHTML = wl.position.likelihood+" %";
            var waitingListRank = <HTMLElement>_this.modalService.findElementById('strs-wl-rank');
            waitingListRank.innerHTML = "# "+wl.position.rank;
          }
          else if (wl.waitingListStatus === 'CLOSED') {
            displaySection = _this.modalService.findElementById('strs-wl-closed');
            displaySection.style.display = 'block';
            //set fan group slug
            var fanGroupSlug = <HTMLAnchorElement>_this.modalService.findElementById('strs-fg-slug');
            fanGroupSlug.innerHTML = wl.groupName.en;
            fanGroupSlug.href = "http://www.seaters.com/"+wl.groupSlug;
          }
        },
        function(err) {
          //TODO
        }
      );



    }

    /**
     *  Show WL information
     */
    setupWaitingListInfo () {
      this.modalService.showModal(
        require('./wl.html'),
        require('./app.css')
      );
      var closeBtn = this.modalService.findElementById('strs-btn-close');
      closeBtn.onclick = () => { this.modalService.closeModal()};

      this.showWaitingListInfo();
    }

    startFlow (wlId: string) {
      this.wlId = wlId;

      if (this.sessionService.whoami()) {
        //TODO: TEST for validated email; if not yet, nav to validation form otherwise continue to WL
        this.checkJoinStatus();
      } else {
        this.setupLogin();
      }
    }

    private hasRank (wl: ExtendedWaitingList) {
      return wl.actionStatus === WAITING_LIST_ACTION_STATUS.CONFIRM ||
        wl.actionStatus === WAITING_LIST_ACTION_STATUS.WAIT ||
        wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE;
    }

    private joinWaitingListIfNeeded (wl: ExtendedWaitingList, numberOfSeats:number): Promise<ExtendedWaitingList> {


        if (this.hasRank(wl)) {
            return Promise.resolve(wl);
        } else if (wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK) {
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
        } else {
            return Promise.reject('Unsupported FG action status: ' + fg.actionStatus);
        }
    }

}
