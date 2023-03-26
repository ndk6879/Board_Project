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
app.use(express.static(path.join(__dirname, 'board_project_front_sj/build')));

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/board_project_front_sj/build/index.html'));
  });

/*
ajax요청을 위한 코드
1. 서버프로젝트 터미널에서 npm install cors 설치
2. express.json() 은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요
3. cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요합니다. 
*/
app.use(express.json());
var cors = require('cors');
app.use(cors());

// 환경변수 사용하기 위해 dotenv 호출
require('dotenv').config()

// DB 연결 시키는 코드
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(process.env.DB_URL, function(에러, client){
  if (에러) return console.log(에러)
  db = client.db('ProjectA');
  app.listen(process.env.PORT, function() {
    console.log('listening on 8080 :)')
  })
})

// 로그인에 필요한 라이브러리 호출
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { write } = require('fs');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.post('/test', (req, res) => {
    res.status(200).send({'message' : '없쪄!'})
})

app.put('/post/:id', (req, res) => {
    db.collection('post').updateOne( 
        {_id : parseInt(req.params.id)}, 
        {$set : { title : req.body.title, content : req.body.content }}, 
        (err, result) => {
            console.log('req.body.title:',req.body.title)
            console.log('req.body.content:',req.body.content)
            console.log('req.body.id:',req.body.id)
            // console.log('result:',result)
            res.status(202).send({'message' : 'OK'})
        }
        );
  });

app.delete('/post/:id', (req, res) => {
    req.body._id =  parseInt(req.params.id)
    db.collection('post').deleteOne( 
        {_id : parseInt(req.params.id)}, 
        (err, result) => {
            console.log('req.body.title:',req.body.title)
            console.log('req.body.content:',req.body.content)
            console.log('req.body.id:',req.body.id)
            // console.log('result:',result)
            res.status(204).send({'message' : 'OK', 'res' : result})
        }
        );
}); 


app.get('/list/user', (req, res) => {
    db.collection('user').find().toArray( (에러, 결과) => {
        res.json(결과)
    });
})


app.get('/', function(요청, 응답) {
    db.collection('post').find({type : 'forum'}).toArray( (에러1, 결과1) => {
        db.collection('post').find({type : 'qna'}).toArray( (에러2, 결과2) => {
            console.log('결과1:',결과1);
            console.log('결과2:',결과2);
            응답.render('index.ejs', {결과1 : 결과1, 결과2 : 결과2});
        });
        
    });
    
});


app.post('/signup', (req, res) => {
    db.collection('user').insertOne({id : req.body.id , pw : req.body.pw}, (err, res) => {
        console.log('회원가입 성공')
    })
    res.status(201).send({'message' : 'OK'})
})



app.get('/comment', 로그인했니, function(req,res) {
    res.render('comment.ejs');
});

function getComment() {
    return new Promise(function(resolve, reject) {
        db.collection('comment').find().toArray( (에러, 결과) => {
            resolve(db.collection('comment').countDocuments({}));    
        });
    });
}

app.post('/comment', (req,res) => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var dateString = year + '.' + month  + '.' + day + '.' + hours  + '.' + minutes;

    var id;
    getComment().then(function(data) { 
        id = data + 1;
        var comment_info = {
            _id : id,
            author : req.user.id, 
            post : req.body.post, 
            comment : req.body.comment, 
            time : dateString, 
            like : 0
        }
        db.collection('comment').insertOne( comment_info, (에러, 결과) => {
            if(에러){return console.log(에러)}
            else {
                console.log('댓글 추가 완료 from backend')
                res.status(201).send({'message': 'OK'}); 
            }
        })
    })
})

        
        


app.get('/login', function(요청, 응답) {
    응답.render('login.ejs');
});

// 1. 아이디 비번 인증도와주는 코드
// 미들웨어(passport.authenticate())는 return done(null, 결과). 결과 = { _id: 638d7674ff68b04761143c0f, id: 'test', pw: 'test' }
app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){
    console.log('요청.user:', 요청.user)
    console.log('Authentication 성공');
    응답.json({ data: 요청.user, message: 'OK' });

});

app.post('/logout', function(req,res){
    req.logout(() => {
        req.session.destroy((function(){
            res.cookie('connect.sid','',{maxAge:0})
            res.json({ message: 'logout' });
            // res.redirect('/');
          })
        
        )
    });
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

function getPost() {
    return new Promise(function(resolve, reject) {
        db.collection('post').find().toArray( (에러, 결과) => {
            resolve(db.collection('post').countDocuments({}));    
        });
    });
}

app.post('/post', (req,res) => {

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '/' + month  + '/' + day;
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds; //포맷 = 15:47:29

    getPost().then(function(data) { 
        console.log('data:',data)

        var post_info = {
            _id: data + 1, 
            author : req.user.id, 
            authorID : req.user._id, 
            date : dateString, 
            title : req.body.title, 
            content : req.body.content, 
            type : req.body.type, 
            like : 0
        }

        db.collection('post').insertOne( post_info, (에러, 결과) => {
            res.status(201).send({'message':'OK'});
        })
    })
    
})


app.get('/forum', (req, res) => {
    db.collection('post').find({type : 'forum'}).toArray( (에러, 결과) => {
        res.json({data: 결과})
    });
})

app.get('/forum/:id', (req, res) => {
    db.collection('post').findOne( { _id : parseInt(req.params.id), type : 'forum'}, (err, result) => {
        res.json({
            'data':result,
        })
    } )
})

app.get('/qna', (req, res) => {
    db.collection('post').find({type : 'qna'}).toArray( (에러, 결과) => {
        res.json({data: 결과})
    });
})

app.get('/qna/:id', (req, res) => {
    db.collection('post').findOne( { _id : parseInt(req.params.id), type : 'qna'}, (err, result) => {
        res.json({
            'data':result,
        })
    } )
})

app.get('/posts/:postID/comments', (req, res) => {
    db.collection('comment').find({ post : req.params.postID }).toArray((err, result) => {
        res.json({ 'comments' : result })
    })
})

app.get('/posts/:postID/comments/:commentID', (req, res) => {
    db.collection('comment').findOne({ post : req.params.postID, _id : parseInt(req.params.commentID) }, (err, result) => {
        res.json({ 'comments' : result })
    })
})

function 로그인했니(req, res, next) { 
    if (req.user) { 
        next() 
    } 
    else { 
        res.status(403).send({'message':'NO'}) 
    }
} 

/*
어떻게 인증할건지 세부 코드
LocalStrategy(): 이게 여러분 local 방식으로 아이디/비번 검사를 어떻게 할지 도와주는 부분
*/

passport.use(new LocalStrategy({
    usernameField: 'id', // 사용자가 제출한 아이디가 어떤 <input>인지 확인. <input>의 name 속성값을 적어주시면 됩
    passwordField: 'pw', // 사용자가 제출한 비번이 어떤 <input>인지 확인. <input>의 name 속성값을 적어주시면 됩
    session: true, // true는 세션을 하나 만들어줄건지
    passReqToCallback: false, // 아이디/비번말고 다른 정보검사가 필요한지)
    }, function (입력한아이디, 입력한비번, done) {
    console.log('입력한아이디:',입력한아이디, '입력한비번:',입력한비번);
    db.collection('user').findOne({ id: 입력한아이디, pw: 입력한비번}, function (에러, 결과) {
        /*
        에러, 결과는 null이고 결과가 맞으면 { _id: 638d7674ff68b04761143c0f, id: 'test', pw: 'test' }
        */
        if (에러) return done(에러)
    
        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
        if (입력한비번 == 결과.pw) {
            
        return done(null, 결과)
        } else {
        return done(null, false, { message: 'ㄹ비번틀렸어요' })
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
  

