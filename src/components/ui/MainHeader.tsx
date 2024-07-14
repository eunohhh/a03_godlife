"use client";

function MainHeader() {
    // const { me, logOut } = useAuth();
    return (
        <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem] border-gray-500 border-b-2">
            <div className="text-white text-2xl font-MangoByeolbyeol">God Life Mate</div>
            {/* <p className="text-[10px] mt-4 font-Pretendard-Regular text-gray-500">
                {me ? <button onClick={logOut}>로그아웃</button> : <Link href="/login"> 로그인</Link>}
            </p> */}
        </div>
    );
}

export default MainHeader;
