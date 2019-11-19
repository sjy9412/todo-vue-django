# Vue - DRF

## 1. 기본 설정

1. Django

   1. 가상환경 설정

      ```bash
      $ python -V
      3.7.4
      $ python -m venv venv
      $ source venv/Scripts/activate
      (venv)
      ```

   2. 패키지 pip 설치

      ```bash
      $ pip install django djangorestframework
      ```

   3. django 프로젝트 생성

      ```bash
      $ django-admin startproject {프로젝트 명} .
      ```

      

2. Vue

   1. VueCLI 설치

      ```bash
      $ npm install -g @vue/cli
      ```

   2. Vue 프로젝트 생성

      ```bash
      $ vue create {프로젝트 이름}
      ```

3. 프로젝트 폴더 구조

   ```
   todo-django-vue/
   	todo-django/
   		venv/
   		manage.py
   		todo_django/
   	todo-vue/
   		node_modules/
   		public/
   		src/
   		package.json
   ```



## 2. DRF 모델링

## 3. Vue

### Vue-router

```bash
$ npm i vue-router
$ vue add router
> still proceed? y
> Use history mode for router? (Requires proper server setup for in fallbak in production)y
```

## 4. Todos axios 요청

1. getTodos 메소드 정의

   ```vue
   // Home.vue
   getTodos() {
       axios.get('http://127.0.0.1:8000/api/v1/todos/')
         .then(response => {
           console.log(response.data[0].title) 
           this.todos = response.data
         })
         .catch(error => {
           console.log(error)
         })
       }
   ```

2. mounted에서 호출

   ```vue
   // Home.vue
   mounted() {
     this.getTodos()
   }
   ```

3. CORS 오류 발생

   * 해결하기 위해서는 django 서버에서 설정이 필요

4. `django-cors-headers` 패키지 활용

   * [Github 참고]( https://github.com/adamchainz/django-cors-headers )

   ```bash
   $ pip install django-cors-headers
   ```

   * `INSTALLED_APPS`, `MIDDLEWARE` 설정
   * `CORS_ORIGIN_ALLOW_ALL` : True시 모든 도메인에서 요청 가능
   * `CORS_ORIGIN_WHITELIST` : 위의 옵션을 False로 하고, 화이트리스트에 직접 도메인 등록
   * 기타 옵션들도 확인해 볼 것

5. Vue에서 다시 요청 보내보기

## 5. TodoForm component를 통해 Todo 등록하기

## 6. 로그인 기능

> JWT (JSON Web Token) : 토큰 기반 로그인 인증
>
> JWT는 기본적으로 헤더, Payload, Verify signature로 구성된다.
>
> https://jwt.io에서 직접 디코딩을 해볼 수 있다.

1. 클라이언트(Vue) 로그인 정보(username, password)를 서버(Django)로 전송
2. 서버는 해당 정보를 바탕으로 Token을 발급 및 암호화
3. 클라이언트는 Token을 받아서 매 요청 때마다 헤더에 해당 Token 정보를 추가해서 보냄
4. 서버에서는 매번 Token이 유효한지 확인 및 데이터 전송
5. 클라이언트는 전송된 값을 디코딩하여 사용자 정보 활용

### 1) Django

```bash
$ pip install djangorestframework-jwt
```

