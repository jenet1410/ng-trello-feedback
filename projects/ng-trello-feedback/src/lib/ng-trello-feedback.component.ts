import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'trello-feedback',
  templateUrl: './ng-trello-feedback.component.html',
  styleUrls: ['./ng-trello-feedback.component.scss']
})
export class NgTrelloFeedbackComponent implements OnInit {
  @Input() public customButtonName: string = 'Provide Feedback';
  @Input() public modalTitle: string = 'Please provide your Feedback';
  @Input() public customBtnPosition: string = 'top-right';
  @Input() public appKey: string;
  @Input() public appToken: string;
  @Input() public trelloListName: string;
  @Input() public boardId: string;
  @Input() public modalClass: string;
  @Input() public btnClass: string;
  @Input() public showEmail: boolean = true;
  @Input() public btnColor: string;
  @Input() public btnBackGroundColor: string;

  trelloJson: any;
  fileToUpload: any = '';
  cardId: string;
  successMsg: string;
  model: any = {};
  errorMsg: string;
  idList: any;
  showLoader: any = false;
  location: string;
  browserName: string;
  browserVersion: string;
  siteUrl: string;
  /* @Input() customButton: any = {
    name: 'Provide Feedback',
    position: 'top-right',
    fontColor: 'black',
    bgColor: 'blue',
    fontSize: '14px',
    bordercolor: 'black',
    borderRadius: '5px',
    width: '150px',
    height: '30px'
  }; */

  constructor(private http: HttpClient) {
    this.loadScripts();
  }

  ngOnInit() {
    this.getIdList();
    this.getBrowser();
    this.siteUrl = window.location.href;
    const modalEle: any = document.getElementById('myModal');
    if (modalEle && modalEle !== undefined) {
      modalEle.style.display = 'none';
    }
    setTimeout(() => {
      const win: any = window;
      const jq: any = win.jQuery;
      jq.getScript('http://www.geoplugin.net/javascript.gp', (res) => {
        console.log(win.geoplugin_countryName());
        this.location = win.geoplugin_countryName();
      });
    }, 3000);
  }

  loadScripts() {
    const dynamicScripts = [
     'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js',
     'js/scripts.js',
     'http://www.geoplugin.net/javascript.gp'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  findBrowserVersion(name) {
    let sUsrAg = navigator.userAgent, firstInd, lastInd, browserInd;
    browserInd = sUsrAg.indexOf(name);
    firstInd = browserInd + name.length + 1;
    lastInd = sUsrAg.indexOf(' ', browserInd);
    if (lastInd === -1) {
      lastInd = sUsrAg.length;
    }
    this.browserVersion = sUsrAg.slice(firstInd, lastInd);
  }

  getBrowser() {
    let sUsrAg = navigator.userAgent;
// The order matters here, and this may report false positives for unlisted browsers.
    if (sUsrAg.indexOf('Firefox') > -1) {
      this.browserName = 'Mozilla Firefox';
      this.findBrowserVersion('Firefox');
    } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
      this.browserName = 'Samsung Internet';
      this.findBrowserVersion('SamsungBrowser');
    } else if (sUsrAg.indexOf('Opera') > -1) {
      this.browserName = 'Opera';
      this.findBrowserVersion('Opera');
    } else if (sUsrAg.indexOf('OPR') > -1) {
      this.browserName = 'Opera';
      this.findBrowserVersion('OPR');
    } else if (sUsrAg.indexOf('Trident') > -1) {
      this.browserName = 'Microsoft Internet Explorer';
      this.findBrowserVersion('Trident');
    } else if (sUsrAg.indexOf('Edge') > -1) {
      this.browserName = 'Microsoft Edge';
      this.findBrowserVersion('Edge');
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      this.browserName = 'Google Chrome';
      this.findBrowserVersion('Chrome');
    } else if (sUsrAg.indexOf('Safari') > -1) {
      this.browserName = 'Apple Safari';
      this.findBrowserVersion('Safari');
    } else {
      this.browserName = '';
      this.browserVersion = '';
    }
    console.log(this.browserVersion);
    console.log(this.browserName);
  }

  getIdList(triggerCardPost?: boolean) {
    /* this.http.get(this.trelloBoardUrl + '.json').subscribe(res => {
      this.trelloJson = res;
      if (this.trelloListName) {
        let idExists;
        if (this.trelloJson && this.trelloJson.lists && this.trelloJson.lists.length > 0) {
          idExists = this.trelloJson.lists.find(x => x.name.toLowerCase() === this.trelloListName.toLocaleLowerCase());
        }
        if (idExists) {
          this.idList = idExists.id;
        } else {
          this.createList();
        }
      } else if (this.trelloJson && this.trelloJson.lists) {
        this.idList = this.trelloJson.lists[0].id;
      } else {
        this.createList();
      }
    },
    (error) => {
      this.errorMsg = 'Please create a trello board / enter a valid trello url';
      console.log(this.errorMsg);
    }); */
    /* this.http.get(`https://api.trello.com/1/boards/${this.boardId}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${this.appKey}&token=${this.appToken}`).subscribe(res => {
      console.log(res);
      this.trelloJson = res;
      if (this.trelloListName && this.trelloJson.length > 0) {
        let idExists;
        if (this.trelloJson && this.trelloJson.length > 0) {
          idExists = this.trelloJson.find(x => x.name.toLowerCase() === this.trelloListName.toLocaleLowerCase());
        }
        if (idExists) {
          this.idList = idExists.id;
        } else {
          this.createList();
        }
      } else if (this.trelloJson && this.trelloJson.length > 0) {
        this.idList = this.trelloJson[0].id;
      } else {
        this.createList();
      }
    },
    (error) => {
      this.errorMsg = 'Please create a trello board / enter a valid trello url';
      console.log(this.errorMsg);
    }); */
    this.showLoader = true;
    this.http.get(`https://api.trello.com/1/boards/${this.boardId}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${this.appKey}&token=${this.appToken}`)
      .subscribe(
      res => {
        console.log(res);
        this.trelloJson = res;
        if (this.trelloListName && this.trelloJson.length > 0) {
          let idExists;
          if (this.trelloJson && this.trelloJson.length > 0) {
            idExists = this.trelloJson.find(x => x.name.toLowerCase() === this.trelloListName.toLocaleLowerCase());
          }
          if (idExists) {
            this.idList = idExists.id;
            if (triggerCardPost) {
              this.createCard();
            } else {
              this.showLoader = false;
            }
          } else {
            this.createList(triggerCardPost);
          }
        } else if (this.trelloJson && this.trelloJson.length > 0) {
          this.idList = this.trelloJson[0].id;
          if (triggerCardPost) {
            this.createCard();
          } else {
            this.showLoader = false;
          }
        } else {
          this.createList(triggerCardPost);
        }
      },
      error => {
        this.errorMsg = 'Some technical issue. Please try again Later!!';
        this.successMsg = '';
        this.showLoader = false;
        console.log('Please create a trello board / enter a valid trello url');
      }
    )

  }

  createList(triggerCardPost ?: boolean) {
    if (!this.trelloListName) {
      this.trelloListName = 'default-list-1';
    }
    this.http.post(`https://api.trello.com/1/lists?name=${this.trelloListName}&idBoard=${this.boardId}`
    + `&key=${this.appKey}&token=${this.appToken}`, null)
      .subscribe((res: any) => {
        this.showLoader = false;
        if (res && res.id) {
          this.idList = res.id;
          if (triggerCardPost) {
            this.createCard();
          }
        } else {
          this.errorMsg = 'Some technical issue. Please try again Later!!';
          this.successMsg = '';
          console.log('Please create a list in the trello board');
        }
      },
      (error) => {
        this.errorMsg = 'Some technical issue. Please try again Later!!';
        this.successMsg = '';
        this.showLoader = false;
        console.log('Please create a list in the trello board');
      });
  }

  postCard() {
    if (this.idList) {
      let description: string = `Issue Detail: ${this.model.description} %0A Site Url: ${this.siteUrl} %0A Browser Name: ${this.browserName} %0A Browser Version: ${this.browserVersion} %0A User Location: ${this.location}`;
      if (this.model.email) {
        description += `%0A Email: ${this.model.email}`;
      }
      console.log(description);
      this.http.post(`https://api.trello.com/1/cards?name=${this.model.issue}&desc=${description}&idList=${this.idList}&keepFromSource=all&key=${this.appKey}&token=${this.appToken}`, null)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.cardId = res.id;
          if (this.fileToUpload) {
            console.log('created card successfully!!');
            this.showLoader = true;
            this.makeAttachmentApiCall();
          } else {
            this.showLoader = false;
            this.successMsg = 'Your Feedback has been submitted successfully. Thanks for your feedback!';
            this.errorMsg = '';
          }
        }
      },
      (error) => {
        this.errorMsg = 'Some technical issue. Please try again Later!!';
        this.successMsg = '';
        this.showLoader = false;
        console.log('Card not able to create');
      });
    } else {
      this.getIdList(true);
    }
  }

  createCard() {
    this.showLoader = true;
    this.postCard();
  }

  makeAttachmentApiCall() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('key', this.appKey);
    formData.append('token', this.appToken);
    formData.append('name', this.fileToUpload.name);
    formData.append('mimeType', this.fileToUpload.type);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post(`https://api.trello.com/1/cards/${this.cardId}/attachments/`, formData, {headers: headers})
      .subscribe(res => {
          console.log('updated attachment successfully!!');
          this.showLoader = false;
          this.successMsg = 'Your Feedback has been submitted successfully. Thanks for your feedback';
          this.errorMsg = '';
        },
        (error) => {
          this.showLoader = false;
          this.errorMsg = 'Some technical issue. Please try again Later!!';
          this.successMsg = '';
          console.log('Not able to update attachment. Please try Again!!');
      });
  }

  openModal() {
    this.successMsg = '';
    this.errorMsg = '';
    this.showLoader = false;
    this.model = {};
    this.fileToUpload = '';
    const modalEle: any = document.getElementById('myModal');
    if (modalEle && modalEle !== undefined) {
      modalEle.style.display = 'block';
    }
    /* const modalEle: any = document.getElementById('myModal');
    if (modalEle && modalEle !== undefined) {
      modalEle.style.display = 'block';
    } */
  }

  closeModal() {
    const modalEle: any = document.getElementById('myModal');
    if (modalEle && modalEle !== undefined) {
      modalEle.style.display = 'none';
    }
    this.successMsg = '';
    this.errorMsg = '';
    this.showLoader = false;
    this.model = {};
    this.fileToUpload = '';
    /* const modalEle: any = document.getElementById('myModal');
    if (modalEle && modalEle !== undefined) {
      modalEle.style.display = 'none';
    } */
  }

  onSubmit() {
    //after submitting
    this.createCard();
    //val.form.reset();
  }

  handleFileInput(val: NgForm) {
    let target: HTMLInputElement = <HTMLInputElement> event.target;
    let files: FileList = target.files;
    this.fileToUpload  = files[0];
    console.log(this.fileToUpload);
  }

}
