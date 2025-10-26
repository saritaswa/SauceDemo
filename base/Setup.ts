import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { expect, Locator, } from '@playwright/test'
import { chromium,Page, Browser} from "@playwright/test"

       let Browser:Browser
       let page: Page

BeforeAll(async function(){    
    Browser=await chromium.launch({headless:true})
    page=await Browser.newPage()
    
 })

 AfterAll(async function(){
  await page.close()
  await Browser.close();

})