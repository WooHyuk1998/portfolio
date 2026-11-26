/* 공개일은 YouTube 공개본 기준. 제작기간과 아카이브 작업 시기는 사용자 제공 정보. 제작일·작품별 프로그램은 확인 후 입력합니다. */
window.PORTFOLIO = {
  works: [
    { key:'mary', youtube:'q4ABdGflPbc', title:'토키노 메리 데뷔영상', officialTitle:'스텔라이브 4기생 저주인형 메리 키타!!', category:'debut', label:'DEBUT', series:'토키노 메리 · 데뷔 하이라이트', date:'2026.10.23', duration:'12:25', description:'토키노 메리 공식 채널에 공개된 데뷔 하이라이트 영상입니다.', role:'영상 편집', productionDate:null, productionPeriod:'3일', software:[], thumbnail:'assets/thumb-mary.jpg' },
    { key:'hotclip-1', youtube:'8BOsN1CaS3M', title:'그쪽 말고 나를 보라고', category:'hotclip', label:'HOT CLIP', series:'스텔라 핫클립 · 9월 5부', date:'2026.11.15', duration:'8:25', description:'멤버들의 방송 속 재미있는 순간들을 한 편에 모은 스텔라 핫클립입니다.', role:'영상 편집', productionDate:null, productionPeriod:'7일', software:[], thumbnail:'assets/thumb-hotclip-1.jpg' },
    { key:'hotclip-2', youtube:'hqbF9y-0l4Y', title:'아예?아뇨아뇨아뇨', category:'hotclip', label:'HOT CLIP', series:'스텔라 핫클립 · 9월 2부', date:'2026.10.31', duration:'8:22', description:'멤버별 방송 장면과 함께하는 순간을 모은 스텔라 핫클립입니다.', role:'영상 편집', productionDate:null, productionPeriod:'6일', software:[], thumbnail:'assets/thumb-hotclip-2.jpg' },
    { key:'hotclip-3', youtube:'ub8FHFvNkgA', title:'다 마로 때문이야 ㅠㅠ', category:'hotclip', label:'HOT CLIP', series:'스텔라 핫클립 · 8월 3부', date:'2026.10.12', duration:'8:27', description:'스텔라이브 멤버들의 방송 속 장면을 모은 정기 핫클립입니다.', role:'영상 편집', productionDate:null, productionPeriod:'7일', software:[], thumbnail:'assets/thumb-hotclip-3.jpg' },
    { key:'star-trail', youtube:'wJG9Ty_3_Jw', title:'여기서 우셔야 합니다.', category:'content', label:'CONTENTS', series:'STAR TRAIL MV 리액션 모아보기', date:'2026.05.18', duration:'11:05', description:'STAR TRAIL 뮤직비디오를 감상하는 멤버들의 리액션을 모은 콘텐츠입니다.', role:'영상 편집', productionDate:null, productionPeriod:'8일', software:[], thumbnail:'assets/thumb-star-trail.jpg' },
    { key:'cliche', youtube:'vfKzynZpj-U', title:'공양은 치즈로 받겟습니다', category:'content', label:'CONTENTS', series:'클리셰 2주년 콘텐츠', date:'2026.06.04', duration:'12:35', description:'스텔라이브 클리셰의 2주년 기념 콘텐츠입니다.', role:'영상 편집', productionDate:null, productionPeriod:'7일', software:[], thumbnail:'assets/thumb-cliche.jpg' },
    { key:'everys', youtube:'0ZKymrDzz_o', title:'허접이에요 허접', category:'content', label:'CONTENTS', series:'에버리스 1주년 콘텐츠', date:'2026.10.21', duration:'9:39', description:'스텔라이브 에버리스의 1주년 기념 콘텐츠입니다.', role:'영상 편집', productionDate:null, productionPeriod:'8일', software:[], thumbnail:'assets/thumb-everys.jpg' }
  ],
  company: [
    {key:'bxten-night',youtube:'hV5WlXJ97Rc',title:'CRYPTO NIGHT in Seoul Forest',date:'2024.09.19',duration:'0:51',series:'BXTEN · 행사 하이라이트'},
    {key:'bxten-bali',youtube:'JwHzjYwRAD8',title:'Coinfest Asia · Bali 2024',date:'2024.09.04',duration:'0:36',series:'BXTEN · 행사 하이라이트'},
    {key:'bxten-metamask',youtube:'BtnpdeclNQg',title:'Metamask 전송 가이드',date:'2024.09.04',duration:'1:48',series:'BXTEN · 서비스 가이드'},
    {key:'bxten-short',youtube:'teCfQMup7_0',title:'브랜드 소개 · Short version',date:'2024.09.04',duration:'1:05',series:'BXTEN · 브랜드 영상'},
    {key:'bxten-full',youtube:'jBvRjOWvMq0',title:'브랜드 소개 · Full version',date:'2024.08.20',duration:'2:51',series:'BXTEN · 브랜드 영상'},
    {key:'bxten-kyc',youtube:'ytpR9sYAIeE',title:'KYC 이용 가이드',date:'2024.08.13',duration:'0:54',series:'BXTEN · 서비스 가이드'},
    {key:'bxten-signup',youtube:'o0lMG_IlWVM',title:'BXTEN 가입 가이드',date:'2024.08.07',duration:'0:34',series:'BXTEN · 서비스 가이드'},
    {key:'bxten-tour',youtube:'69q6P3L3nrc',title:'Global Event Tour',date:'2024.08.06',duration:'0:55',series:'BXTEN · 행사 하이라이트'},
    {key:'bxten-forum',youtube:'at4qgzlAxXI',title:'BXTEN LABS KOREA FORUM 2024',date:'2024.07.23',duration:'0:52',series:'BXTEN · 행사 하이라이트'},
    {key:'bxten-ixo',youtube:'h6QER20fEhQ',title:'IXO 2024 · Seoul',date:'2024.07.17',duration:'1:02',series:'BXTEN · 행사 하이라이트'},
  ].map(work => ({...work,label:'ARCHIVE',category:'company',period:'2023–2024',role:'영상 편집',description:'BXTEN 공식 채널에 공개된 이전 회사 작업입니다.',thumbnail:`assets/thumb-${work.key}.jpg`,productionDate:null,productionPeriod:null,software:[]})),
  personal: [
    {key:'motion',title:'2D Motion Graphics',series:'개인 포트폴리오 · 2D 모션그래픽',label:'PERSONAL',category:'personal',period:'2023–2024',duration:'0:16',description:'초기 개인 포트폴리오 모션그래픽 작업입니다.',role:'개인 작업',video:'assets/archive-motion.mp4',thumbnail:'assets/archive-motion.jpg',productionDate:null,productionPeriod:null,software:[]},
    {key:'c4d',title:'Cinema 4D · 골목과 자동차',series:'개인 포트폴리오 · 3D',label:'PERSONAL',category:'personal',period:'2023–2024',duration:'0:33',description:'Cinema 4D로 제작한 골목과 자동차 장면의 개인 포트폴리오입니다.',role:'개인 작업',video:'assets/archive-c4d.mp4',thumbnail:'assets/archive-c4d.jpg',productionDate:null,productionPeriod:null,software:['Cinema 4D']}
  ]
};
