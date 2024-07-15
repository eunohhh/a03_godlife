## A03 tripleS

<br />

**목표와 다짐을 공유하고 응원하는 소셜 네트워크 서비스 입니다.**

<br />

**팀원 소개**

---

| 최슬기 | 강연주 | 양윤성 | 김도희 | 윤새라 | 오은 |
| :----: | :----: | :----: | :----: | :----: | :--: |
|  ISFJ  |  INFJ  |  ENFJ  |  INTJ  |  ISFP  | INTJ |
|  팀장  |  팀원  |  팀원  |  팀원  |  팀원  | 팀원 |

<br />

<br />

**프로젝트 명** : 갓생메이트

**배포 링크** : (https://a03-godlife.vercel.app)

**팀 노션** : [갓생메이트](https://www.notion.so/teamsparta/tripleS-A03-3677f0fe740a4e4dae2d5679321509bc)

**발표 자료** : (https://drive.google.com/drive/folders/1nltTyUAMIwsh9i6Rb8sox2bmsQtpxE95)

**시연 영상** : (https://youtu.be/eMb5l1DeNSE)

**개발 기간** : 2024.07.8~ 2024.07.15 (약 1주간)

**프로젝트 소개** : 사용자들이 서로 소개하고 응원하는 소셜 네트워크 서비스입니다.

**프로젝트 목표** : 사용자가 자신의 목표와 다짐을 공유하고 다른 사용자로부터 응원과 동기부여를 받을 수 있는 소셜 네트워크 서비스입니다. 이 플랫폼은 트위터와 유사한 사용자 경험을 제공하며, 할일 목록과 다짐을 작성하고, 다른 사용자와 소통할 수 있는 기능을 중심으로 합니다.

<br />

### 🚦 Project Rules

#### **개발 환경(버전참고)**

- **Environment :** Visual Studio Code, git, github
- **Language :** Javascript
- **Framwork** : Next.js(14.2.4)

- **Library**

  - tanstack/react-query
  - tanstack/react-qeury-devtools
  - cva
  - clsx
  - supabase/supabase-js
  - supabase/ssr
  - tailwind css

- **DB**: supabase
- **Communication** : figma, slack, notion, zep

<br />

#### **깃허브 규칙**

- 브랜치 이름 :
  - dev
  - feat/auth
  - feat/cheerup
  - feat/delete
  - feat/edit
  - feat/mainpage
  - feat/profile
  - feat/sidebar
  - feat/write
  - main

### Commit Convention

- [update] : 해당 파일에 새로운 기능이 생김
- [add] : 없던 파일을 생성함, 초기 세팅
- [bugfix] : 버그 수정
- [refactor] : 코드 리팩토링
- [fix] : 코드 수정
- [move] : 파일 옮김/정리
- [del] : 기능/파일을 삭제
- [test] : 테스트 코드를 작성
- [style] : css
- [gitfix] : gitignore 수정
- [script]: package.json 변경(npm 설치 등)

## ✨️기능 설명

<br />

1.  Main Page
    - 컴포넌트 작성 및 UI구현, Supabase에서 게시물정보,시간을 가져오고 정렬기능에서 최신순 인기순으로 정렬, 응원하기, 무한스크롤 기능
2.  SignUp Page, Login Page
    - 인증/인가 관련 기능들
3.  SideBar
    - 로그인 유저 사이드바 오픈 가능, 사이드바 유저 정보, 날씨 API 데이터 불러오기
4.  Profile Page, ProfileUpdate Page
    - 프로필 수정 페이지 이미지,닉네임,한줄 소개,본인 글에 한해 수정,삭제
5.  WritePage
    - 게시물 CRUD 기능 구현
6.  ETC
    - supabase DB구축, Shadcn 커스텀 알럿창

## ⚽︎트러블슈팅

<br />

- 기능 : posts 테이블에 likescount 자동 추가하기

### 문제 1

**`이슈`**

- 문제 : cheerup 테이블에 로우가 추가되면 자동으로 id 맞게 posts 테이블에도 count 를 추가하기

<br />

**`해결`**

1.  likescount 관리용 테이블 별도 생성
    - users(유저 정보), posts(주요 콘텐츠)
    - cheerup(likes를 ‘누른 유저’와 likes가 ‘눌린 게시물’의 id 정보 연결된) 테이블
    - posts 테이블에 likecount 컬럼(해당 게시물의 likes 카운트 관리) 추가
2.  likescount를 자동 컬럼 값 변경을 위한 SQL문 작성
    - row 데이터로 쌓인 likecount를 세는 방식으로 수동 업데이트 되는 부분
    - cheerup 테이블에 likes가 insert, delete 되는 조건으로 작동되는 함수 작성 후 해당 함수를 트리거로 등록(보안 유지, 권한 제한을 위해 SECURITY DEFINER 추가)

<br />

## 📂파일 구조

<br />

    src/
    ├── api/
    │   ├── getInfinitePosts.ts
    │   ├── getUserFn.ts
    │   └── getUserFnClient.ts
    ├── app/
    │   ├── (providers)/
    │   ├── (authenticated)/
    │   │   ├── edit/[id]/
    │   │   │   └── page.tsx
    │   │   ├── profile/
    │   │   │   └── page.tsx
    │   │   ├── profileupdate/
    │   │   │   └── page.tsx
    │   │   ├── write/
    │   │       ├── page.tsx
    │   │       ├── layout.tsx
    │   │       └── loading.tsx
    │   ├── (root)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── recover/
    │   │   │   └── page.tsx
    │   │   ├── signup/
    │   │       ├── page.tsx
    │   │       ├── layout.tsx
    │   │       └── loading.tsx
    ├── api/
    │   ├── auth/
    │   │   ├── callback/
    │   │   │   └── route.ts
    │   │   ├── confirm/
    │   │   │   └── route.ts
    │   │   ├── log-in/
    │   │   │   └── route.ts
    │   │   ├── log-out/
    │   │   │   └── route.ts
    │   │   └── me/
    │   │       └── route.ts
    │   ├── provider/
    │   │   └── route.ts
    │   ├── recover/
    │   │   ├── route.ts
    │   │   └── recover-redirect/
    │   │       └── route.ts
    │   ├── sign-up/
    │   │   └── route.ts
    │   ├── cheerup/
    │   │   └── route.ts
    │   ├── posts/
    │   │   └── route.ts
    │   └── weather/
    │       └── route.ts
    ├── auth/
    │   ├── provider/
    │   │   └── route.ts
    │   ├── recover/
    │   │   ├── route.ts
    │   │   └── recover-redirect/
    │   │       └── route.ts
    │   ├── sign-up/
    │   │   └── route.ts
    │   ├── cheerup/
    │   │   └── route.ts
    │   ├── posts/
    │   │   └── route.ts
    │   └── weather/
    │       └── route.ts
    ├── favicon.ico
    ├── globals.css
    ├── layout.tsx
    ├── loading.tsx
    ├── components/
    │   ├── auth/
    │   │   ├── AuthHydrationBoundary.tsx
    │   │   ├── AuthPageBottom.tsx
    │   │   ├── AuthPageWrapper.tsx
    │   │   ├── GithubLoginButton.tsx
    │   │   ├── GoogleLoginButton.tsx
    │   │   ├── KaKaoLoginButton.tsx
    │   │   ├── LogInForm.tsx
    │   │   ├── LogOutButton.tsx
    │   │   ├── ResetForm.tsx
    │   │   └── SignUpForm.tsx
    │   ├── data/
    │   │   └── emojis.tsx
    │   └── ui/
    │       ├── Alert-dialog.tsx
    │       ├── Avatar.tsx
    │       ├── BasicLoader.tsx
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── CenterLogo.tsx
    │       ├── Checkbox.tsx
    │       ├── CustomAlert.tsx
    │       ├── DropdownMenu.tsx
    │       ├── InfiniteScroll.tsx
    │       ├── Input.tsx
    │       ├── LogoutLoader.tsx
    │       ├── MainHeader.tsx
    │       ├── PostCard.tsx
    │       ├── Select.tsx
    │       ├── Separator.tsx
    │       ├── Sheet.tsx
    │       ├── SideBar.tsx
    │       ├── SidebarComponent.tsx
    │       ├── Submit-button.tsx
    │       ├── TopButton.tsx
    │       ├── WeatherData.tsx
    │       └── Cheerup.tsx
    ├── constants/
    │   └── constants.ts
    ├── context/
    │   ├── auth.context.tsx
    │   └── hooks/
    │       ├── useAuth.tsx
    │       ├── useAuthContext.tsx
    │       └── useMeQuery.tsx
    ├── lib/
    │   ├── authContextInit.ts
    │   ├── authValidations.ts
    │   ├── commonRegexs.ts
    │   ├── deletePost.ts
    │   ├── editPost.ts
    │   ├── openCustomAlert.ts
    │   ├── severGetUser.ts
    │   ├── utils.ts
    │   └── providers/
    │       └── QueryProvider.tsx
    ├── supabase/
    │   ├── client.ts
    │   ├── middleware.ts
    │   └── server.ts
    ├── types/
    │   ├── me.type.ts
    │   ├── post.type.ts
    │   ├── supabase.ts
    │   ├── weather.ts
    │   ├── zustand.type.ts
    │   └── zustand/
    │       └── post.store.ts
    ├── .gitignore
    ├── .eslintrc.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    ├── tailwind.config.ts
    └── tsconfig.json
