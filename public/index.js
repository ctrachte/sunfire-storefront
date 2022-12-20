async function getLinks () {
    return await fetch('/links').then(async (res) =>{
        let response = await res.json();
        console.log(response)
        response.links.forEach((link) => {
        let linkElement = document.createElement('div')
        linkElement.innerHTML = 
        `<div class="flex flex-wrap w-1/3">
            <div class="p-10 flex justify-center content-center">
                <!--Card 1-->
                <div onclick="location.href = '${link.url}';"
                class="text-center max-w-sm cursor-pointer rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                            <img class="w-full" src="/sunfireNewLogoSmall.jpg" alt="SunfireOriginalLogo">
    
                    <div class="font-bold text-center text-orange-500 text-xl mb-2">Sunfire Monthly</div>
                </br>
                    <p class="font-bold text-center text-gray-700 text-base">
                    Try Sunfire Monthly - 30 days free!
                    </p>
                    <p class="text-center text-gray-700 text-base">
                    Then just $15.00 per month
                    </p>
                </br>
                    <p class="text-center text-gray-700 text-base">
                    Every month you will be sent a fresh bottle of Sunfire Original hot
                    sauce!
                    </p>
                </div>
                <div class="text-center px-6 pt-4 pb-2">
                    <span
                    onclick="location.href = '${link.url}';"
                    class="cursor-pointer inline-block bg-orange-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2"
                    >
                    Subscribe and feel the heat!
                    </span>
                </div>
                </div>
            </div>
            </div>`;
        document.querySelector('.links-container').appendChild(linkElement)
    });
    }).catch( err => console.error(err));
}
let res = getLinks();
