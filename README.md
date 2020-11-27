# cat-aip
#ImgForum
This project was generated with Angular CLI version 8.3.0, Node.js verion 10.16.3 with Front-end being Angular Project, and Backend developed with express.js 

## Assessment Related 
A group repo for 32549 group assignment

### User List
/******************
Git ID: Winoooops
Name: Wei Wang
StuID: 13118157
******************/

/******************
Git ID: Haochaozhu
Name: Haochao Zhu
StuID: 13064151
******************/

/******************
Git ID: SunnyYeL
Name: ye Li
StuID: 13147879
******************/

# Note: 
- Haochao Zhu(13064151) contributed to User login and password encryption on node.js, his code has been merged from haochao-dev branch to master branc(see commit `c2543f993599431b6c2c7f127d27e50b15861576` on Oct 3rd)
- Ye's(Ye Li 13147879) contribution is on the ye-branch which didn't been merged on the github because of confilicts `

## Front-end Server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Back-end Server
Run npm run dev a dev server. Navigate to http://localhost:3000/. The app will automatically reload for any changes made on backend project

## Running unit tests on backend 
The purpose of this test is to test the CRUD interaction's working properly once the backend project is npm installed.
Run npm test to execute the unit tests via mocha

## Further Improvements
1. Front-end and back-end projects on the same git repository limits the usable of deploying a cloud server 
2. The Restful API from Backend could be more sufficient with cache and materialization
3. The trade-off between firing requests with managing the state with behavior subject 
4. The notion of having recursive and reusable comment component is overwhelming, so had to toggle this feature for now, but definitely need to add this feature bacause this is what a real-world website should have
5. For fast-prototyping, use thread's documentID from the mongodb for front-end routing, but for safety issues, need to avoid this
6. Use's password is encrypted with bcrypt's hash, but considering the fact that it could be reengineerd or re-encrypted once the hackers gain the access of the database, it could be potentially dangerous
7. User Experience, UI design and advanced styling (Probably with more profound understanding of Angular Material)

