'use client';

import { useState } from 'react';
import './page.css';

interface DailyMenu {
  day: string;
  menu: string;
  nutrition: string;
  cost: number;
}

interface RestrictedDiet {
  id: string;
  name: string;
  allergies: string[];
  diet: string;
}

export default function Home() {
  const [weeklyMenu, setWeeklyMenu] = useState<DailyMenu[]>([
    { day: '월요일', menu: '소불고기덮밥 + 미역국', nutrition: '탄수화물 60%, 단백질 20%, 지방 20%', cost: 8500 },
    { day: '화요일', menu: '제육볶음 + 된장국', nutrition: '탄수화물 55%, 단백질 25%, 지방 20%', cost: 8200 },
    { day: '수요일', menu: '생선까스 + 타르타르소스', nutrition: '탄수화물 50%, 단백질 30%, 지방 20%', cost: 9000 },
    { day: '목요일', menu: '닭다리 데리야끼 + 현미밥', nutrition: '탄수화물 58%, 단백질 28%, 지방 14%', cost: 7800 },
    { day: '금요일', menu: '돈까스 + 우동', nutrition: '탄수화물 62%, 단백질 22%, 지방 16%', cost: 8800 },
  ]);

  const [restrictedDiets, setRestrictedDiets] = useState<RestrictedDiet[]>([
    { id: '1', name: '김철수', allergies: ['새우', '조개'], diet: '일반식' },
    { id: '2', name: '이영희', allergies: ['계란'], diet: '채식' },
    { id: '3', name: '박민수', allergies: ['우유', '치즈'], diet: '일반식' },
  ]);

  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showDietForm, setShowDietForm] = useState(false);
  const [newDiet, setNewDiet] = useState({ name: '', allergies: '', diet: '일반식' });

  const handleAddDiet = () => {
    if (newDiet.name.trim()) {
      setRestrictedDiets([
        ...restrictedDiets,
        {
          id: String(Date.now()),
          name: newDiet.name,
          allergies: newDiet.allergies.split(',').map(a => a.trim()).filter(a => a),
          diet: newDiet.diet,
        },
      ]);
      setNewDiet({ name: '', allergies: '', diet: '일반식' });
      setShowDietForm(false);
    }
  };

  const handleRemoveDiet = (id: string) => {
    setRestrictedDiets(restrictedDiets.filter(d => d.id !== id));
  };

  const totalWeeklyCost = weeklyMenu.reduce((sum, menu) => sum + menu.cost, 0);

  return (
    <div className="container">
      <section className="feature-section">
        <h2>📋 주간 메뉴 자동 계획</h2>
        <p className="feature-description">
          월~금 저녁 메뉴를 자동으로 구성하고, 영양 밸런스와 비용을 최적화합니다. 구매팀이 미리 식재료를 준비할 수 있어 구매 효율이 높아집니다.
        </p>
        
        <div className="menu-grid">
          {weeklyMenu.map((menu, index) => (
            <div key={index} className="menu-card">
              <h3>{menu.day}</h3>
              <p className="menu-name">{menu.menu}</p>
              <p className="nutrition">🥗 {menu.nutrition}</p>
              <p className="cost">💰 {menu.cost.toLocaleString()}원</p>
            </div>
          ))}
        </div>
        
        <div className="cost-summary">
          <strong>주간 총 식재료비: {totalWeeklyCost.toLocaleString()}원</strong>
          <p>1인당 평균: {Math.round(totalWeeklyCost / 5).toLocaleString()}원/일</p>
        </div>
      </section>

      <section className="feature-section">
        <h2>🛡️ 알레르기·식단 제한 관리</h2>
        <p className="feature-description">
          직원의 알레르기, 채식 여부 등 식단 제약사항을 미리 등록하고 관리합니다. 안전한 식사 제공으로 회사 책임감을 높이고 불의의 사고를 예방합니다.
        </p>
        
        <button 
          className="btn btn-primary"
          onClick={() => setShowDietForm(!showDietForm)}
        >
          {showDietForm ? '✕ 닫기' : '+ 직원 등록'}
        </button>
        
        {showDietForm && (
          <div className="form-container">
            <input
              type="text"
              placeholder="직원명"
              value={newDiet.name}
              onChange={(e) => setNewDiet({ ...newDiet, name: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="알레르기 (쉼표로 구분: 새우, 계란)"
              value={newDiet.allergies}
              onChange={(e) => setNewDiet({ ...newDiet, allergies: e.target.value })}
              className="form-input"
            />
            <select
              value={newDiet.diet}
              onChange={(e) => setNewDiet({ ...newDiet, diet: e.target.value })}
              className="form-select"
            >
              <option value="일반식">일반식</option>
              <option value="채식">채식</option>
              <option value="무글루텐">무글루텐</option>
              <option value="할랄">할랄</option>
            </select>
            <button 
              className="btn btn-success"
              onClick={handleAddDiet}
            >
              등록
            </button>
          </div>
        )}
        
        <div className="diet-list">
          {restrictedDiets.map((diet) => (
            <div key={diet.id} className="diet-card">
              <div className="diet-info">
                <h4>{diet.name}</h4>
                <p>📌 식단: <span className="diet-type">{diet.diet}</span></p>
                {diet.allergies.length > 0 && (
                  <p>⚠️ 알레르기: <span className="allergies">{diet.allergies.join(', ')}</span></p>
                )}
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveDiet(diet.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        
        <div className="info-box">
          <p>✅ 현재 등록된 직원: {restrictedDiets.length}명</p>
          <p>⚠️ 알레르기 관리 대상: {restrictedDiets.filter(d => d.allergies.length > 0).length}명</p>
        </div>
      </section>
    </div>
  );
}
