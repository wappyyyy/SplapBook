import { test, expect } from '@playwright/test'

test.describe('チーム検索機能', () => {
  test.beforeEach(async ({ page }) => {
    // チームページに移動
    await page.goto('/teams')
  })

  test('チーム検索フォームが表示される', async ({ page }) => {
    // 検索フォームの要素が存在することを確認
    await expect(page.locator('text=チーム検索')).toBeVisible()
    await expect(page.locator('input[placeholder*="最小XP"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="最大XP"]')).toBeVisible()
    await expect(page.locator('button:has-text("検索")')).toBeVisible()
  })

  test('XP範囲でチーム検索ができる', async ({ page }) => {
    // 最小XP入力
    await page.fill('input[placeholder*="最小XP"]', '2000')
    
    // 最大XP入力
    await page.fill('input[placeholder*="最大XP"]', '3000')
    
    // 検索ボタンをクリック
    await page.click('button:has-text("検索")')
    
    // 検索結果が表示されるまで待機
    await page.waitForTimeout(2000)
    
    // 検索結果が表示されることを確認（結果がある場合）
    const searchResults = page.locator('[data-testid="team-card"], .team-card')
    const resultCount = await searchResults.count()
    
    if (resultCount > 0) {
      // 結果が存在する場合、チームカードが表示されることを確認
      await expect(searchResults.first()).toBeVisible()
      
      // 各チームカードにチーム名とXPが表示されることを確認
      for (let i = 0; i < Math.min(resultCount, 3); i++) {
        const teamCard = searchResults.nth(i)
        await expect(teamCard).toBeVisible()
        
        // チーム名が表示されることを確認
        await expect(teamCard.locator('text=/チーム|Team/')).toBeVisible()
        
        // XPスコアが表示されることを確認
        await expect(teamCard.locator('text=/XP|xp/')).toBeVisible()
      }
    } else {
      // 結果がない場合、適切なメッセージが表示されるか確認
      await expect(page.locator('text=/検索結果がありません|チームが見つかりませんでした/')).toBeVisible()
    }
  })

  test('無効なXP範囲でエラーが表示される', async ({ page }) => {
    // 最小XPに最大XPより大きい値を入力
    await page.fill('input[placeholder*="最小XP"]', '3500')
    await page.fill('input[placeholder*="最大XP"]', '2000')
    
    // 検索ボタンをクリック
    await page.click('button:has-text("検索")')
    
    // エラーメッセージが表示されることを確認
    await expect(page.locator('text=/最小XPは最大XPより小さい値を入力してください|無効な範囲/')).toBeVisible()
  })

  test('検索結果のクリアが機能する', async ({ page }) => {
    // まず検索を実行
    await page.fill('input[placeholder*="最小XP"]', '1500')
    await page.fill('input[placeholder*="最大XP"]', '4000')
    await page.click('button:has-text("検索")')
    
    // 検索結果が表示されるまで待機
    await page.waitForTimeout(2000)
    
    // クリアボタンがある場合はクリック
    const clearButton = page.locator('button:has-text("クリア")')
    if (await clearButton.isVisible()) {
      await clearButton.click()
      
      // 検索結果がクリアされることを確認
      await expect(page.locator('[data-testid="team-card"], .team-card')).toHaveCount(0)
    }
  })

  test('チーム登録後に検索できる', async ({ page }) => {
    // チーム登録フォームに移動または表示
    const registerForm = page.locator('form')
    
    if (await registerForm.isVisible()) {
      // テストチームを登録
      await page.fill('input[placeholder*="チーム名"]', 'テストチーム')
      
      // プレイヤー情報を入力
      await page.fill('input[placeholder*="プレイヤー1"]', 'Player1')
      await page.fill('input[placeholder*="XP1"]', '2500')
      await page.fill('input[placeholder*="プレイヤー2"]', 'Player2')
      await page.fill('input[placeholder*="XP2"]', '2600')
      await page.fill('input[placeholder*="プレイヤー3"]', 'Player3')
      await page.fill('input[placeholder*="XP3"]', '2700')
      await page.fill('input[placeholder*="プレイヤー4"]', 'Player4')
      await page.fill('input[placeholder*="XP4"]', '2800')
      
      // 登録ボタンをクリック
      await page.click('button:has-text("登録")')
      
      // 登録完了を待機
      await page.waitForTimeout(2000)
      
      // 検索を実行して登録したチームが見つかることを確認
      await page.fill('input[placeholder*="最小XP"]', '2000')
      await page.fill('input[placeholder*="最大XP"]', '3000')
      await page.click('button:has-text("検索")')
      
      await page.waitForTimeout(2000)
      
      // 登録したチームが検索結果に表示されることを確認
      await expect(page.locator('text=テストチーム')).toBeVisible()
    }
  })
})