import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '회사 저녁밥 추천봇',
  description: '주간 메뉴 자동 계획 및 알레르기 관리 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="app-container">
          <header className="app-header">
            <h1>🍽️ 회사 저녁밥 추천봇</h1>
            <p className="subtitle">영양 맛있는 직원식 자동 계획 시스템</p>
          </header>
          <main className="app-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
