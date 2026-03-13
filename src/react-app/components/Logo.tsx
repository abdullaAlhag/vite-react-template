//import React from 'react';

const Logo = () => {
  return (
    <div className="logo-wrapper py-4 flex justify-center bg-transparent">
      <style>{`
        :root {
            --blue: #007dc5;
            --grey: #6d6e71;
            --green: #8cc63f;
            --light-blue: #00a0e9;
        }
        .logo-container {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;
        }
        .logo-main {
            display: flex;
            align-items: flex-end;
            position: relative;
            border-bottom: 4px solid var(--blue);
            padding-bottom: 5px;
        }
        .char {
            font-size: clamp(30px, 6vw, 60px); 
            font-weight: 800;
            line-height: 0.9;
            letter-spacing: -2px;
        }
        .char-t { color: var(--blue); position: relative; }
        .char-t::before {
            content: '';
            position: absolute;
            top: -10%;
            left: 25%;
            width: clamp(8px, 1.5vw, 15px);
            height: clamp(8px, 1.5vw, 15px);
            background: conic-gradient(var(--blue) 75%, var(--grey) 0);
            border-radius: 50%;
            border: 1px solid #ddd;
        }
        .char-g { color: var(--grey); }
        .char-c { color: var(--green); }
        .heart-rate {
            width: clamp(25px, 5vw, 50px);
            height: clamp(25px, 5vw, 45px);
            overflow: hidden;
            position: relative;
            margin-left: -2px;
            margin-bottom: 5px;
        }
        .heart-rate svg {
            width: 200%;
            height: 100%;
            fill: none;
            stroke: var(--light-blue);
            stroke-width: 6;
            animation: move-pulse 1.5s linear infinite;
        }
        @keyframes move-pulse {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .arabic-text {
            font-size: clamp(12px, 2vw, 18px);
            font-weight: bold;
            color: #333;
            direction: rtl;
        }
        .english-text {
            font-size: clamp(8px, 1.5vw, 12px);
          font-weight: bold;
	color: var(--blue);
        }
      `}</style>

      <div className="logo-container">
        <div className="logo-main">
          <div className="char char-t">T</div>
          <div className="char char-g">G</div>
          <div className="char char-c">C</div>
          <div className="heart-rate">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points="0,50 20,50 25,10 35,90 40,50 60,50 80,50 85,10 95,90 100,50" />
            </svg>
          </div>
        </div>
        <div className="logo-text text-center mt-1"> 
      {/*    <div className="arabic-text">مؤسسة تكنو جيرماني للمعدات الطبية</div>*/}
         <div className="english-text">Technogermany Medical Equipment</div>
       </div>
      </div>
    </div>
  );
};

export default Logo;

