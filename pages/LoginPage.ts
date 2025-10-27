import { Locator, Page, expect } from "@playwright/test"
import { TEST_USERS } from "../testData/Login.data"


export class LoginPage {
    readonly page: Page
    readonly title: Locator
    readonly username: Locator
    readonly password: Locator
    readonly loginbtn: Locator
    readonly errormsg: Locator
    readonly homepageTitle: Locator


    constructor(page: Page,) {
        this.page = page
        this.title = page.getByText('Swag Labs')
        this.username = page.locator('input[data-test="username"]')
        this.password = page.locator('input[data-test="password"]')
        this.loginbtn = page.locator('input[data-test="login-button"]')
        this.errormsg = page.locator('h3[data-test="error"]')
        this.homepageTitle = page.getByText('Products')
    }

    async gotoLoginPage() {
        await this.page.goto("/")
    }
    async validateLoginPage() {
        await expect(this.title).toBeVisible()
        await expect(this.username).toBeVisible()
        await expect(this.password).toBeVisible()
        await expect(this.loginbtn).toBeVisible()
    }

    async verifysuccessfulLogin(username: string, password: string) {
        await this.username.fill(TEST_USERS.STANDARD.username)
        await this.password.fill(TEST_USERS.STANDARD.password)
        await this.loginbtn.click()
    }
    async verifyUnsuccessfulLogin(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginbtn.click()

    }
    async verifyErrorMessageforUnsuccessfulLogin() {
        const errormsg = this.errormsg
        await expect(errormsg).toBeVisible()
    }
    async validateHomePageAfterLogin() {
        const homepageTitle = this.homepageTitle
        await expect(homepageTitle).toBeVisible()
    }

}