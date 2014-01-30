import random

def tied_kirj(koko, nimi, mini, maxi):
    print("Kirjoitetaan matriisia.")
    tiedosto = open(nimi, "w")
    #tiedosto.write("adjacency_matrix" +"\n")
    #tiedosto.write(str(koko) +"\n")
    tiedosto.write("""#no_route=-
#split=|
#begin=s\n""")
    tiedosto.write("s|")

    for i in range(0, koko):
        if (i != koko-1):
            tiedosto.write(str(i) + "|")
        else:
            tiedosto.write(str(i) + "\n")
    for i in range(koko):
        tiedosto.write(t_rivi(koko,mini,maxi, i) +"\n")
        if(i == koko /2):
            print("50% valmiina.")
        elif(i == koko /4):
            print("25% valmiina.")
        elif(i == koko*3 /4):
            print("75% valmiina.")
        elif(i == koko /10):
            print("10% valmiina.")
    tiedosto.close()
    print("Valmis.")


def t_rivi(koko,mini,maxi, index):
    rivi = str(index) + "|"
    for i in range(koko):
        tmp = luku(mini,maxi)
        temp = str(tmp)
        if(tmp <= 0):
            temp = "-"
        
        if(i < koko-1):
            rivi += temp + "|"
        else:
            rivi += temp

    return rivi

def luku(mini,maxi):
    arvo = (random.randint(mini,maxi))
    return arvo

def main():
    nimi = input("Syötä graphin nimi: ")
    koko = int(input("Syötä matriisin koko: "))
    mini = int(input("Syötä minimi weight arvo, negatiiviset muutetaan '-': "))
    maxi = int(input("Syötä maksimi weight arvo: "))
    tied_kirj(koko, nimi, mini, maxi)

if __name__ == "__main__":
    main()
