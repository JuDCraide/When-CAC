

def calculatePointsEps(diff):
    if (diff == 0):
        return 100
    elif (diff <= 10):
        return round(99 - (diff * 4) / 10)
    elif (diff <= 25):
        return round(95 - ((diff - 10) * 10) / (25 - 10))
    elif (diff <= 50):
        return round(85 - ((diff - 25) * 15) / (50 - 25))
    elif (diff <= 100):
        return round(70 - ((diff - 50) * 20) / (100 - 50))
    elif (diff <= 200):
        return round(50 - ((diff - 100) * 25) / (200 - 100))
    elif(diff <= 300):
        return round(25 - ((diff - 200) * 15) / (300 - 200))
    else:
        return max(round(10 - ((diff - 300) * 10) / (600 - 300)), 0)

def calculatePointsDate(diff):
    if (diff <= 1):
        return 100
    elif (diff <= 3):
        return 99
    elif (diff <= 7):
        return 98
    elif (diff <= 15):
        return round(97 - ((diff - 7) * 2) / (15 - 7))
    elif (diff <= 31):
        return round(95 - ((diff - 15) * 10) / (31 - 15))
    elif (diff <= 91):
        return round(85 - ((diff - 31) * 15) / (91 - 31))
    elif (diff <= 183):
        return round(70 - ((diff - 91) * 15) / (183 - 91))
    elif (diff <= 365):
        return round(55 - ((diff - 183) * 20) / (365 - 183))
    elif (diff <= 365 * 3):
        return round(35 - ((diff - 365) * 20) / (365 * 3 - 365))
    else:
        return max(round(15 - ((diff - 365 * 3) * 15) / (365 * 5 - 365 * 3)), 0)
    


from matplotlib import pyplot as plt
entries = []
points = []
for i in range(0, 650):
    entries.append(i)
    points.append(calculatePointsEps(i))
plt.plot(entries, points)

plt.savefig('ep.png')

entries = []
points = []
for i in range(0, 2000):
    entries.append(i)
    points.append(calculatePointsDate(i))
plt.plot(entries, points)

plt.savefig('date.png')