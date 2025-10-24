# DevTinder APIs
(using Express router)
Do a logical separation/grouping of the routers:

## authRouter:
- POST /signup
- POST /login
- POST /logout

## profileRouter:
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //Forgot password API
    

## requestRouter:
Statuses: Sender[Ignore, Interested], Receiver[Accepted, Rejected]
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter:
- GET /user/connections
- GET /user/requests/received
- GET /user/feed (Profile of other people on the platform)