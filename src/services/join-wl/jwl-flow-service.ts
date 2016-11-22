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
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-password', error:'Mandatory'});
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
          this.modalService.showFieldError('sl-email-error', error.details[0].error.defaultMessage);
        }
      }
      //Test for general error
      else {
        this.modalService.showFieldError('sl-email-error',error.error.defaultMessage);
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
      var email = (<HTMLInputElement>this.modalService.findElementById("sl-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("sl-password")).value;

      //..and do client validation first
      var validationErrors = this.validateLoginForm(email, password);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Login
        this.enableButton('sl-btn-login',false);
        this.sessionService.doEmailPasswordLogin(email, password)
          .then(function(res) {
            _this.enableButton('sl-btn-login',true);
            _this.checkJoinStatus();
          }, function(err) {
            _this.enableButton('sl-btn-login',true);
            if(err instanceof Error) {
              console.log('session.doEmailPasswordLogin error', err.stack);//DEBUG
              //$scope.error = err.stack;
            } else {
              console.log('session.doEmailPasswordLogin error', err);//DEBUG
              //$scope.error = err;
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
        validationErrors.push({field:'sl-email', error:'Mandatory'});
      }

      //Test password
      if(!this.modalService.validateRequired(password)) {
        //validationErrors.push({field:'sl-password', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-password', error:'Mandatory'});
      }

      //Test firstname
      if(!this.modalService.validateRequired(firstname)) {
        //validationErrors.push({field:'sl-firstname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-firstname', error:'Mandatory'});
      }

      //Test lastname
      if(!this.modalService.validateRequired(lastname)) {
        //validationErrors.push({field:'sl-lastname', error:'sl_input_err_required'});
        validationErrors.push({field:'sl-lastname', error:'Mandatory'});
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
      var email = (<HTMLInputElement>this.modalService.findElementById("sl-email")).value;
      var password = (<HTMLInputElement>this.modalService.findElementById("sl-password")).value;
      var firstname = (<HTMLInputElement>this.modalService.findElementById("sl-firstname")).value;
      var lastname = (<HTMLInputElement>this.modalService.findElementById("sl-lastname")).value;

      //..and do client validation first
      var validationErrors = this.validateSignupForm(email, password, firstname, lastname);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Login
        this.enableButton('sl-btn-signup',false);
        this.sessionService.doEmailPasswordSignUp(email, password, firstname, lastname)
          .then(function(res) {
           //Continue with email validation
            _this.enableButton('sl-btn-signup',true);
            _this.setupEmailValidation(res);
          }, function(err) {
            _this.enableButton('sl-btn-signup',true);
            if(err instanceof Error) {
              //$scope.error = err.stack;
            } else {
              //$scope.error = err;
            }

            _this.modalService.showFieldError('sl-email-error',err.message);
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
        validationErrors.push({field:'sl-confirmation-code', error:'Mandatory'});
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
      var confirmationCode = (<HTMLInputElement>this.modalService.findElementById("sl-confirmation-code")).value;
      var email = userData.email;

      //..and do client validation first
      var validationErrors = this.validateEmailValidationForm(confirmationCode);
      if (validationErrors.length > 0)
        this.modalService.showFormErrors(validationErrors);
      else {
        //Validate
        this.enableButton('sl-btn-validate',false);
        this.sessionService.doValidation(email, confirmationCode)
          .then(function(res) {
            _this.enableButton('sl-btn-validate',true);
            alert("You have confirmed your email");
          }, function(err) {
            _this.enableButton('sl-btn-validate',true);
            if(err instanceof Error) {
              //$scope.error = err.stack;
            } else {
              //$scope.error = err;
            }

            //For now, add general always show this error, as error info is in different format coming back
            _this.modalService.showFieldError('sl-confirmation-code-error',"Wrong validation code");
          });

      }
    }

    setupEmailValidation (userData) {
      console.log(userData);

      this.modalService.showModal(
        require('./validate.html'),
        require('./app.css')
      );
      var validateEmailBtn = this.modalService.findElementById('sl-btn-validate');
      validateEmailBtn.onclick = () => this.doEmailValidation(userData);
      var userSpan = this.modalService.findElementById('sl-span-firstname');
      userSpan.innerHTML = userData.firstName;
    }

    setupSignup () {
      this.modalService.showModal(
        require('./signup.html'),
        require('./app.css')
      );
      var signupBtn = this.modalService.findElementById('sl-btn-signup');
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
      var loginBtn = this.modalService.findElementById('sl-btn-login');
      loginBtn.onclick = () => this.doLogin();
      var navToSignup = this.modalService.findElementById('sl-nav-signup');
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
          .then(() => this.joinWaitingListIfNeeded(wl))
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

          console.log(wl);

          //TODO: - handle no position situation -> auto join wl

          var waitingListName = <HTMLElement>_this.modalService.findElementById('sl-wl-name');
          waitingListName.innerHTML = wl.displayName;
          var displaySection;

          if (wl.waitingListStatus === 'OPEN' && wl.position) {
            displaySection = _this.modalService.findElementById('sl-wl-open');
            displaySection.style.display = 'block';
            //set wl group info
            var waitingListLikelihood = <HTMLElement>_this.modalService.findElementById('sl-wl-likelihood');
            waitingListLikelihood.innerHTML = wl.position.likelihood+" %";
            var waitingListRank = <HTMLElement>_this.modalService.findElementById('sl-wl-rank');
            waitingListRank.innerHTML = "# "+wl.position.rank;
          }
          else if (wl.waitingListStatus === 'CLOSED') {
            displaySection = _this.modalService.findElementById('sl-wl-closed');
            displaySection.style.display = 'block';
            //set fan group slug
            var fanGroupSlug = <HTMLAnchorElement>_this.modalService.findElementById('sl-fg-slug');
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
      var closeBtn = this.modalService.findElementById('sl-btn-close');
      closeBtn.onclick = () => { this.modalService.closeModal()};

      this.showWaitingListInfo();
    }

    startFlow (wlId: string) {
      this.wlId = wlId;

      if (this.sessionService.whoami()) {
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

    private joinWaitingListIfNeeded (wl: ExtendedWaitingList): Promise<ExtendedWaitingList> {
      var numberOfSeats = 1;//TODO: ask user how many seats
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
