# Dynamic Questions Assignment

with Node20+, mongoose, node-cron

# Problem
Given N questions and M regions, design a solution to distribute different questions on each cycle.
A same question should be given to all users in the same region on each cycle.

# Approaches
Author came up with two approaches. This repo contains only the code for first approach.

## First Approach - linked list
- Define a linked list data store for questions, and store the current question also for each region.
- Periodically update the cycle/ current question for each region.

Pros:
- Flexibility to add/ remove questions

Cons:
- Requires an additional cron/ worker

## Second Approach - Number assignments
- Define a question data store. Assign an incrementing number for each question of each region.
- To get current question number, simply use div and mod operation with current timestamp.
- current_question_number = (time_now div duration) mod number_of_questions

Pros:
- Simpler approach - only a single api endpoint

Cons:
- More difficult to add new questions or rearrange questions

# Setup
- node v20+
- run `npm install`
- copy .env.example into env and edit database uri and desired cron expression
- run `npm run seed` to run seeder
- A sample of 5 questions for two regions will be seeded. Also the duration is set to 1 minute for testing.
- run `npm run cron` to run cron job
- run `npm run start` to run api server

# Schema/ DB design

## Questions
questions is a circular linked list collection, storing the question text and next question id

## Cycles
cycles contains current question_id, duration, and last updated time
cycles should be updated every cycle/ period, with a scheduler, cron, worker, etc

# API
Get question api simply gets the current question in the cycle filtered by region

Sample
GET {baseurl}/questions?region=SGP

Response:
```
{"question":"This is question 1 for region SGP"}
```
