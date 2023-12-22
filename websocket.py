import asyncio
import websockets
from random import randint

varsayilanDegerlerDizi = ["Senin için değerleri varsayılan değerler ile değiştiriyorum.",
                          "Default ayarları isteğiniz üzerine tekrardan ayarlıyorum.",
                          "Tabiki eski değerleri yeniden yüklüyorum.",
                          "Güncel ayarları alıp eski değerleri tekrardan yüklüyorum."
                          ]

def take_to_vedabot_list():
    with open('./veda_bot.txt', 'r') as veda_bot_txt:
        veda_bot_satirlar = veda_bot_txt.readlines()
        fixed_veda_bot = [satir.strip() for satir in veda_bot_satirlar]
        random_veda_message = fixed_veda_bot[randint(0, len(fixed_veda_bot) - 1)]
        return random_veda_message

def response_vedauser(parametre):
    with open('./veda_user.txt', 'r') as veda_user_txt:
        veda_user_satirlar = veda_user_txt.readlines()
        fixed_veda_bot2 = [satir.strip() for satir in veda_user_satirlar]
        if parametre in fixed_veda_bot2:
            return True

def response_countrynamesuser_list(country):
    cevap = f"{country} güzel bir ülkedir."
    

def take_to_countrynamesuser_list():
    with open("./country_names_user.txt", "r") as country_names_user_txt:
        country_names_user_satirlar = country_names_user_txt.readlines()
        print(country_names_user_satirlar)



async def handler(websocket, path):
    while True:
        cevap = "Dediğinizi anlamadım. Lütfen anlaşılır yazarmısınız? Bu chatbot kısıtlı verilere sahiptir. Lütfen komplike olmayan bir şey isteyin."
        data = await websocket.recv()
        print(f"Kullanıcı: {data}")
        controlvalue = response_vedauser(data)
        if controlvalue:
            cevap = take_to_vedabot_list()
        if data.lower() in 'exit':
            await websocket.send("Görüşmek üzere, iyi günler dilerim!")
            break
        
        defaultDegerlereDon = ["default", "varsayılan"]
        for item in defaultDegerlereDon:
            if item in data.lower():
                cevap = varsayilanDegerlerDizi[randint(0,len(varsayilanDegerlerDizi) - 1)] + "*default"
            
        await websocket.send(cevap)

if __name__ == "__main__":
    start_server = websockets.serve(handler, "localhost", 8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
