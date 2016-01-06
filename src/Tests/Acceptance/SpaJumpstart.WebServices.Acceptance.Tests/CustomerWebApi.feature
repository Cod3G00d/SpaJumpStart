#https://github.com/turnkey-commerce/ResearchLinks/blob/master/ResearchLinks.SpecTests/ProjectsApi.feature
#http://www.culbertsonexchange.com/wp/?p=293
#http://www.hackered.co.uk/articles/some-really-useful-specflow-steps-when-testing-rest-apis
#https://ruhul.wordpress.com/2015/01/14/end-to-end-testing-of-web-api-2-using-owin-and-specflow/
#
#Feature: Customers Restful Web API
#      In order to perform CRUD operations on the projects
#      As a client of the Web Api
#      I want to be able to Create, Update, Delete, and List Customers
#
#@mytag
#
#Scenario: Getting All Customers the service should return get correct data
#	Given I have an existing customer
#	When the client requests the webapi service to get all customer data
#	Then I should get the following customers
#	| id | firstname | surname | active | addressid | addressline1  | postcode | email                     |
#	| 1  | Nick      | Rhymes  | true   | 2         | 101 The Manse | ZLD 5LB  | NickRhymes@DeadRising.com |
#	And an Ok Status should be returned
#	And the routname should be "ApiRoute"
#	And the customer id should be 1
#
#Scenario: Getting a Single Customer the service should return correct data
#	Given I have an existing customer
#	And the customer has an unique id of <id>
#	When the client requests the webapi service to get the customer by id
#	Then I should get the following customers
#	| id | firstname | surname | active | addressid | addressline1  | postcode | email                     |
#	| 1  | Nick      | Rhymes  | true   | 1         | 101 The Manse | ZLD 5LB  | NickRhymes@DeadRising.com |
#	And an Ok Status code should be returned
#
#Scenario Outline: Creating a single new customer the service saves the posted data 
#	Given the following customers and authentication
#		| firstname | surname | active | addressline1  | postcode | email                     |
#		| Claire    | Rhymes  | true   | 101 The Manse | ZLD 5LB  | NickRhymes@DeadRising.com |
#	When the client requests the webapi service to post a valid customer 
#	Then a Created status should be returned
#
#Scenario: Updating a existing Customer the service should return correct status
#	Given I have an existing customer
#	And the customer has an unique id of <id>
#	When the client requests the webapi service to get the customer by id
#	Then I should get the following customers
#	| id | firstname | surname | active | addressid | addressline1  | postcode | email                     |
#	| 2  | Claire      | Rhymes  | true   | 1         | 101 The Manse | ZLD 5LB  | NickRhymes@DeadRising.com |
#	And an Ok Status should be returned
#	When the client requests the webapi service to update the customer by id with the following values
#	Then an Accepted Status code should be returned 
#
#Scenario: Deleting a existing Customer the service should return correct status
#	Given I have an existing customer
#	And the customer has an unique id of <id>
#	When the client requests the webapi service to get the customer by id
#	Then I should get the following customers
#	| id | firstname | surname | active | addressid | addressline1  | postcode | email                     |
#	| 2  | Claire    | Rhymes  | true   | 1         | 101 The Manse | ZLD 5LB  | NickRhymes@DeadRising.com |
#	And an Ok Status should be returned
#	When the client requests the webapi service to update the customer by id with the following values
#	| firstname | surname | active | email |
#	| Nick      | Rhymes  | false  | NickRhymes@DeadRising.com |
#	Then a Ok Status code should be returned 