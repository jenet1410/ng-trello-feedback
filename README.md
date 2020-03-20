# NgTrelloFeedback

This library helps to get feedback from users and stores in Trello Board which enable you to organize and prioritize your projects or customer feedback initiatives.

## Installation

Run `npm i ng-trello-feedback`

## Implementation

#### STEP 1:
You need to import the `NgTrelloFeedbackModule` by adding the following lines to your app.module.ts file.
```
import { NgTrelloFeedbackModule } from 'ng-trello-feedback';
…
@NgModule ({....
imports: [...,
NgTrelloFeedbackModule,
…]
})
```

#### STEP 2:
Add the <trello-feedback> tag to the component where you want to add feedback modal like so:
    ```<trello-feedback [appKey]="'your api key'" [appToken]="'your api token'" [boardId]="'your board ID'" [trelloListName]="'trelloListName'"></trello-feedback>```

## Param usage:

    1)`appKey` and `appToken` should be generated and added in the <trello-feedback> tag. [mandatory params]
    To generate please go through the following link.(https://developers.trello.com/docs/api-introduction).

    2)`boardId` can be taken using below steps. [mandatory param]
    Hit your trello board url in browser after signed in appending `.json`
    Example: https://trello.com/x/xyz/board-name.json
    you can see json object framed like below
    `{"id":"xxxxxxxxxxx","name":"board-name","desc":"","descData":null,"closed":false,"idOrganization":null,"idEnterprise":null........`
    The first attribute `id` value copy and use.
    Example: [boardId]="'xxxxxxxxxxx'"

    3)`trelloListName` allows you to provide the name of your list under which your cards should be stored. If not provided, list will be created in default name. [Optional param]
    Example: [trelloListName]="'my-sample-listname'"

    4)`customBtnPosition` is to align your feedback button. By default it will be `top-right`. The other positions are `top-left/top-right/bottom-left/bottom-right` [Optional param]
    Example: [customBtnPosition]="'top-left'" 

    5)`showEmail` is to disable email textbox in the modal. By default show email is true. If you want to disable, set it to false. [Optional param]
    Example: [showEmail]="false"

    6)`modalClass` is to give flexibility for the developers to add classes to the feedback modal which helps to design the modal just helps in removing css complexity. [Optional param]
    Example: [modalClass]="'your-class-name'"

    7)`btnClass` is to give flexibility for the developers to add classes to the feedback button which helps to design the modal just helps in removing css complexity. [Optional param]
    Example: [btnClass]="'your-feeback-btn-class-name'"

    8)`customButtonName` is to provide appropriate name to your feedback button. [Optional param]
    Example: [customButtonName]="'Please provide Feedback'" or [customButtonName]="'Please post the bugs'"

    9)`modalTitle` is to provide appropriate name to your modal. [Optional param]
    Example: [modalTitle]="'Modal title'"

    10)`btnColor` is to add desired color to the feedback button.
    Example: [btnColor]="'blue'"

    11)`btnBackGroundColor` is to add desired background color to the feedback button.
    Example: [btnBackGroundColor]="'#fff'"

## Running 
    `ng serve`