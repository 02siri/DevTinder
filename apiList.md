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
- PATCH /profile/password //Change password API
    

## requestRouter:
Statuses: Send[Ignore, Interested], Review[Accepted, Rejected]
- POST /request/send/:status/:userId

- POST /request/review/:status/:requestId

## userRouter:
- GET /user/requests/received
- GET /user/connections
- GET /user/feed (Profile of other people on the platform)