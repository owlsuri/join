//로딩시 이메일 입력란에 포커스
$(document).ready(function() {
    $('#email').focus();
    });

//폰번호 포커스 이동
let phoneFocus1 = () => {
    $('#phone1').on("keyup", function() {
        if(this.value.length === 3){
            $('#phone2').focus();
        }
    });

    phoneFocus2();
}

let phoneFocus2 = () => {
    $('#phone2').on("keyup", function() {
        if(this.value.length === 4){
            $('#phone3').focus();
        }
    });

    phoneFocus3()
}

let phoneFocus3 = () => {
    $('#phone3').on("keyup", function() {
        if(this.value.length === 4){
                $('#authBtn').attr('disabled', false)
                $('#authBtn').css({'backgroundColor':'#0068FF', 'color':'#fff'});
                //폰번호의 마지막 칸에 4자가 모두 채워지면, 인증번호전송 버튼 활성화(버튼 색변경)
            }
    });
}

let authNum_send = () => {
    let auth = String(Math.floor(Math.random()*1000000)).padStart(6, "0")
    $('#authNum').text(auth);

    $('#authTimeout').attr('disabled', false)
    $('#authTimeout').css({'backgroundColor':'#0068FF', 'color':'#fff'});
    //인증번호 전송 버튼이 눌리면, 인증완료 버튼 활성화(버튼 색변경)

    $('#authBtn').attr('disabled', true)
    $('#authBtn').css({'backgroundColor':'white', 'color':'gray'}); 
    //인증번호전송 버튼은 다시 비활성화(버튼 색변경)

    timer()
}

let counter;
let timer = () => {
    
    let count = 180 ;
    counter = setInterval(function(){
        if(count > 0) {
            count--;            
        } else{
        clearInterval(counter);

        $('#authTimeout').attr('disabled', true)
        $('#authTimeout').css({'backgroundColor':'white', 'color':'gray'});
        //시간이 만료되면, 인증완료 버튼 다시 비활성화(버튼 색변경) 
        }

        let min = parseInt(count/60, 10);
        let sec = String(parseInt(count%60, 10)).padStart(2,"0");

        $('#authTime').text(min+':'+sec)   

    },1000);       
}

let authTime_out = () => {
    clearInterval(counter);
    $('#authNum').text("000000")
    $('#authTime').text("3:00")

    $('#authTimeout').text("인증확인")
    $('#authTimeout').attr('disabled', true)
    $('#authTimeout').css({'backgroundColor':'white', 'color':'gray'});    

    alert('인증이 완료되었습니다!')

    $('#joinBtn').attr('disabled', false)
    $('#joinBtn').css({'backgroundColor':'#0068FF', 'color':'#fff'});
    //인증완료되면 가입하기 버튼 활성화
}

let joinCheck = () =>{
    let email = $('#email').val()
    let name = $('#name').val()
    let pw1 = $('#pw1').val()
    let pw2 = $('#pw2').val()

    let phone1 = $('#phone1').val()
    let phone2 = $('#phone2').val()
    let phone3 = $('#phone3').val()

    let location = $('#location').val()

    let gender = $("input:radio[name='gender']")

    let check = true;

    //이메일 체크(정규식)
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!emailRule.test(email)){
        $('#email_error').css("opacity", "1")
        check = false;
    }else{
        $('#email_error').css("opacity", "0")
    }

    //이름체크
    if(name === ""){
        $('#name_error').css("opacity", "1")
        check = false;
    } else{
        $('#name_error').css("opacity", "0")
    }

    //비밀번호 체크
    if(pw1 === ""){
        $('#pw1_error').css("opacity", "1")
        check = false;
    } else{
        $('#pw1_error').css("opacity", "0")
    }

    if(pw2 === "" || pw1 != pw2){
        $('#pw2_error').css("opacity", "1")
        check = false;
    } else{
        $('#pw2_error').css("opacity", "0")
    }

    //폰번호 입력 체크
    if(phone1 === "" || phone2 === "" || phone3 === ""){
        $('#phone_error').css("opacity", "1")
        check = false;
    } else{
        $('#phone_error').css("opacity", "0")
    }

    //지역선택 체크
    if(location === "서울" || location === "경기" || location === "인천"){
        $('#location_error').css("opacity", "0")
    } else{
        $('#location_error').css("opacity", "1")
        check = false;
    }

    //성별선택 체크
    if(gender.is(':checked')){
        $('#gender_error').css("opacity", "0")
    } else{
        $('#gender_error').css("opacity", "1")
        check = false;
    }

    let errors = () =>{
            $('#email_error').css("opacity", "0")
            $('#name_error').css("opacity", "0")
            $('#pw1_error').css("opacity", "0")
            $('#pw2_error').css("opacity", "0")
            $('#phone_error').css("opacity", "0")
            $('#location_error').css("opacity", "0")
            $('#gender_error').css("opacity", "0")
    }

    let fin = () =>{
            alert(name + '님 환영합니다!',1000);  
    }

    if(check === true){  
    setTimeout(errors, 10);
    setTimeout(fin, 100)
    }    
}

