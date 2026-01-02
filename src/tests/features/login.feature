@login
Feature: Customer login.

@regression
Scenario: Login with wrong credentials.
Given customer navigates to the login url
When customer provides wrong 'something' as username
And provides wrong 'something' as password
Then error message is shown

@smoke
Scenario Outline: Login with wrong credentials outline.
Given customer navigates to the login url
When customer provides wrong '<name>' as username
And provides wrong '<password>' as password
Then error message is shown

Examples: 
| name | password |
| username1 | password1 |
