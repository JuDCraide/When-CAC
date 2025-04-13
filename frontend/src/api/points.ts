import { Dayjs } from "dayjs"

function calculatePointsEps(ep: number, guessEp: number) {
    const diff = Math.abs(ep - guessEp)
    if (diff === 0) {
        return 100
    } else if (diff <= 10) {
        return Math.round(99 - (diff * 4) / 10)
    } else if (diff <= 25) {
        return Math.round(95 - ((diff - 10) * 10) / (25 - 10))
    } else if (diff <= 50) {
        return Math.round(85 - ((diff - 25) * 15) / (50 - 25))
    } else if (diff <= 100) {
        return Math.round(70 - ((diff - 50) * 20) / (100 - 50))
    } else if (diff <= 200) {
        return Math.round(50 - ((diff - 100) * 25) / (200 - 100))
    } else if (diff <= 300) {
        return Math.round(25 - ((diff - 200) * 15) / (300 - 200))
    } else {
        return Math.max(Math.round(10 - ((diff - 300) * 10) / (600 - 300)), 0)
    }
}

function calculatePointsDate(date: Dayjs, guessDate: Dayjs) {
    const diff = date.diff(guessDate, "days")
    if (diff <= 1) {
        return 100
    } else if (diff <= 3) {
        return 99
    } else if (diff <= 7) {
        return 98
    } else if (diff <= 15) {
        return Math.round(97 - ((diff - 7) * 2) / (15 - 7))
    } else if (diff <= 31) {
        return Math.round(95 - ((diff - 15) * 10) / (31 - 15))
    } else if (diff <= 91) {
        return Math.round(85 - ((diff - 31) * 15) / (91 - 31))
    } else if (diff <= 183) {
        return Math.round(70 - ((diff - 91) * 15) / (183 - 91))
    } else if (diff <= 365) {
        return Math.round(55 - ((diff - 183) * 20) / (365 - 183))
    } else if (diff <= 365 * 3) {
        return Math.round(35 - ((diff - 365) * 20) / (365 * 3 - 365))
    } else {
        return Math.max(Math.round(15 - ((diff - 365 * 3) * 15) / (365 * 5 - 365 * 3)), 0)
    }
}