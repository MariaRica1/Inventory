import { Locator, Page, expect } from "@playwright/test";

export class DatePicker {
    readonly page: Page;
    readonly calendarIcon: Locator;
    readonly calendarMonthYear: Locator;
    readonly calendarPrevButton: Locator;
    readonly calendarNextButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.calendarIcon = page.getByRole('button', { name: 'Open calendar' }).nth(1);
         this.calendarMonthYear = page.getByRole('button', {
            name: /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}$/
        });
        this.calendarPrevButton = page.locator('.mantine-focus-auto.m_2351eeb0').first();
        this.calendarNextButton = page.locator('.m_730a79ed > button:nth-child(3)');  
    }

    //caldendar in current month
   async selectDate(date: string) {

        const targetDate = new Date(date);

        if (Number.isNaN(targetDate.getTime())) {
            throw new Error(`Invalid date: ${date}`);
        }

        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();

        // Open the calendar
        await this.calendarIcon.click();

        // Navigate to the correct month and year
        let reachedTargetMonth = false;

        for (let i = 0; i < 120; i++) {
            const displayedMonthYear =
                (await this.calendarMonthYear.innerText()).trim();

            const match = displayedMonthYear.match(
                /^([A-Za-z]+)\s+(\d{4})$/
            );

            if (!match) {
                throw new Error(
                    `Unable to read calendar header: ${displayedMonthYear}`
                );
            }

            const displayedDate = new Date(
                `${match[1]} 1, ${match[2]}`
            );

            if (Number.isNaN(displayedDate.getTime())) {
                throw new Error(
                    `Invalid calendar header: ${displayedMonthYear}`
                );
            }

            const currentIndex =
                displayedDate.getFullYear() * 12 +
                displayedDate.getMonth();

            const targetIndex =
                targetYear * 12 + targetMonth;

            if (currentIndex === targetIndex) {
                reachedTargetMonth = true;
                break;
            }

            if (currentIndex < targetIndex) {
                await this.calendarNextButton.click();
            } else {
                await this.calendarPrevButton.click();
            }
        }

        if (!reachedTargetMonth) {
            throw new Error(
                `Could not navigate to ${targetDate.toDateString()}`
            );
        }

        // Select only a day belonging to the displayed month
    console.log(
        "Calendar header:",
        await this.calendarMonthYear.innerText()
    );

    const dayButton = this.page.locator(
        `button.mantine-DateInput-day[aria-label="${targetDate.getDate()} ${targetDate.toLocaleString(
            'en-US',
            { month: 'long' }
        )} ${targetDate.getFullYear()}"]`
    );

    await expect(dayButton).toBeVisible();
    await dayButton.click();

    // Verify and click
    await expect(dayButton).toHaveCount(1);
    await expect(dayButton).toBeVisible();
    await expect(dayButton).toBeEnabled();

    await dayButton.click();

    }
 
}