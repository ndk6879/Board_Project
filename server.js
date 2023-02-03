const express = require('express');
const path = require('path');
const app = express();



const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))





// ejs 사용을 위한 코드
app.set('view engine', 'ejs');

//body.parser를 사용하기 위한 코드 (요청.body)
app.use(express.urlencoded({extended: true})) 





//react 연동시키는 코드
// app.use(express.static(path.join(__dirname, 'board_project_front_sj/build')));

// app.get('/', function (요청, 응답) {
//     응답.sendFile(path.join(__dirname, '/board_project_front_sj/build/index.html'));
//   });










// DB 연결 시키는 코드
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://dgnam:DiRn1228@cluster0.jrf8jrq.mongodb.net/ProjectA?retryWrites=true&w=majority', function(에러, client){
  if (에러) return console.log(에러)
  db = client.db('ProjectA');
  app.listen(8080, function() {
    console.log('listening on 8080 :)')
  })
})



/*
get /
get write
post add
post signup

get/post login
get mypage
*/ 

app.get('/list/post', (req, res) => {
    db.collection('post').find().toArray( (에러, 결과) => {
        res.json(결과)
    });
})

app.get('/list/user', (req, res) => {
    db.collection('user').find().toArray( (에러, 결과) => {
        res.json(결과)
    });
})


app.get('/', function(요청, 응답) {
    db.collection('post').find({type : 'forum'}).toArray( (에러1, 결과1) => {
        db.collection('post').find({type : 'QA'}).toArray( (에러2, 결과2) => {
            console.log('결과1:',결과1);
            console.log('결과2:',결과2);
            응답.render('index.ejs', {결과1 : 결과1, 결과2 : 결과2});
        });
        
    });
    
});


app.post('/signup', (요청,응답) => {
    db.collection('user').insertOne({id : 요청.body.id , pw : 요청.body.pw}, (에러, 결과) => {
        console.log('회원가입 완료!');
    })
    응답.send('회원가입 완료!');
})


// // 로그인에 필요한 라이브러리 호출
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


app.get('/login', function(요청, 응답) {
    응답.render('login.ejs');
});

// 1. 아이디 비번 인증도와주는 코드
app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){
    응답.redirect('/');
    console.log('요청.user:', 요청.user)
    console.log('authenticate 성공');
});


app.get('/mypage', 로그인했니, function (요청, 응답) { 
    console.log('마이페이지의 요청.user:', 요청.user); 
    응답.render('mypage.ejs', {사용자 : 요청.user}) 
  }) 

app.get('/write', 로그인했니, (요청, 응답) => {
    console.log('write을 위한 로그인이 된상태')
    console.log('요청.user:', 요청.user)
    응답.render('write.ejs');
})

app.post('/add', (req,res) => {
    db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
        var 총게시물갯수 = 결과.totalPost;
        var 날짜 = new Date();

        db.collection('post').insertOne( {_id: 총게시물갯수 + 1, author : req.user.id, date : 날짜.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'), title : req.body.title, content : req.body.content, type : req.body.type}, (에러, 결과) => {
            console.log('게시글 생성 완료!');
            
            // 응답.redirect('/list') 
            // res.send({ 'req.body':req.body, 'req.user.id':req.user});
            console.log('req.user in add API:',req.user);
            console.log('add로 요청한 write의 POST요청 성공');
            db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(에러, 결과){
                if(에러){return console.log(에러)}
                else {res.send({ 'req.body':req.body, 'req.user.id':req.user});}
                    
            })
        })
    })
})



app.get('/post', (req, res) => {
    db.collection('post').find().toArray( (에러, 결과) => {
        console.log('결과:',결과);
        res.render('post.ejs', {결과: 결과})
    });
})

function 로그인했니(요청, 응답, next) { 
if (요청.user) { 
    next() 
} 
else { 
    응답.send('로그인안하셨는데요?') 
} 
} 

/*
어떻게 인증할건지 세부 코드
LocalStrategy(): 이게 여러분 local 방식으로 아이디/비번 검사를 어떻게 할지 도와주는 부분
*/
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
    }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('user').findOne({ id: 입력한아이디 }, function (에러, 결과) {
        if (에러) return done(에러)
    
        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
        if (입력한비번 == 결과.pw) {
        return done(null, 결과)
        } else {
        return done(null, false, { message: '비번틀렸어요' })
        }
    })
    }));
// user: 회원가입, deesrializer user.요청


/* 
serializer
: 입력한 아이디/비번이 db의 값과 맞다면 -> 세션 방식이 적용됨. 그래서 세션 데이터를 만들어줘야함.(라브가 함) 그리고 세션 데이터에 세션아이디를 발급해 유저에게 보내야함. (i.e. 쿠키로 만들어서 보내주면됨. )

In short, 세션을 만들어줌
*/
passport.serializeUser(function (user, done) {
    console.log('serializeUser user ==', user)
    done(null, user.id)
  });
  
passport.deserializeUser(function (아이디, done) {
db.collection('user').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
})
}); 




// 리액트가 모든 라우팅을 담당하게 하는 코드
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/board_project_front_sj/build/index.html'));
  });