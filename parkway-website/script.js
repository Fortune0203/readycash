const hero = document.querySelectorAll(".hero")
const buttons = document.querySelectorAll(".btn")
const img1 = document.querySelector("#iphone1")
const img2 = document.querySelector("#iphone2")
const receive = document.querySelector(".receive")
const transfer = document.querySelector(".transfer")
const download = document.querySelector(".download")
const downloadLink = document.querySelector(".link")
const downloadBox = document.querySelector("#download-box")
const navBar = document.querySelector(".navbar")
const cookiesBox = document.querySelector(".cookieConsentOverlay")
const cookiesDiv = document.querySelector(".cookies")
const closer = document.querySelector(".close")
const accept = document.querySelector(".accept")
const playVid1 = document.querySelector(".play1")
const playVid2 = document.querySelector(".play2")
const Vid1 = document.querySelector(".vid2")
const Vid2 = document.querySelector(".vid3")
const indicator = document.querySelector(".indicator")
const Banner1 = document.querySelector(".bnr1")
const Banner2 = document.querySelector(".bnr2")

$(document).ready(() => {
    setCookie = (cName, cValue, expDays) => {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }
    getCookie = (cName) =>{
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie);
        const cArr = cDecoded.split("; ");
        let value;
        cArr.forEach(val => {
            if(val.indexOf(name) === 0) value = val.substring(name.length);
        })
        return value;
    }
    accept.addEventListener("click", () => {
        cookiesBox.classList.add("hide-cookies");
        setTimeout(() => {
            cookiesBox.style.display = "none";
        }, 1100);
        setCookie("cookie", true, 30);
    })
    closer.addEventListener("click", () => {
        cookiesBox.classList.add("hide-cookies");
        setTimeout(() => {
            cookiesBox.style.display = "none";
        }, 1100);
    })
    cookieMessage = () => {
        if(!getCookie("cookie")){
            cookiesBox.classList.add("show-cookies")
            setTimeout(() => {
                cookiesBox.style.display = "block";
            }, 100);
        }
    }
    window.addEventListener("load", cookieMessage)

    $(function () {
        $(document).scroll(function () {
            const $nav = $(".navbar");
            $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
        });
    });

    function showReceive() {
        transfer.classList.remove("active")
        img2.classList.remove("active")
        playVid2.classList.remove("active")
        
        receive.classList.add("active")
        img1.classList.add("active")
        playVid1.classList.add("active")
    }

    function showTransfer() {
        receive.classList.remove("active")
        img1.classList.remove("active")
        playVid1.classList.remove("active")
                        
        transfer.classList.add("active")
        img2.classList.add("active")
        playVid2.classList.add("active")
    }
    const banners = document.querySelectorAll(".banner")
    const subtexts = document.querySelectorAll(".subtext")
    function switchBanner(){
        const activeBanner = document.querySelector(".banner.showing");
        const activeBannerIndex = Array.from(banners).indexOf(activeBanner);
        const nextBannerIndex = (activeBannerIndex + 1) % banners.length;

        activeBanner.classList.remove("showing");
        subtexts[activeBannerIndex].classList.remove("showing");
        activeBanner.classList.add("hide");
        subtexts[activeBannerIndex].classList.add("hide");
        
        banners[nextBannerIndex].classList.add("showing");
        subtexts[nextBannerIndex].classList.add("showing");
        banners[nextBannerIndex].classList.remove("hide");
        subtexts[nextBannerIndex].classList.remove("hide");
    }
    let bannerAnim = setInterval(switchBanner, 4000);
    for (let banner of banners){
        banner.addEventListener("mouseover", ()=> {
            clearInterval(bannerAnim)
            console.log("paused")
        })
        banner.addEventListener("mouseleave", ()=> {
            bannerAnim = setInterval(switchBanner, 4000)
            console.log("played")
        })
    }
    for (let subtext of subtexts){
        subtext.addEventListener("mouseover", ()=> {
            clearInterval(bannerAnim)
            console.log("paused2")
        })
        subtext.addEventListener("mouseleave", ()=> {
            bannerAnim = setInterval(switchBanner, 4000)
            console.log("played2")
        })
    }

    function switchState(){
        const tabs = document.querySelectorAll(".content")
        function switcher(){
            const phone = document.querySelectorAll(".iphone")
            const play = document.querySelectorAll(".play")
            const activeTab = document.querySelector(".content.active");
            const activeTabIndex = Array.from(tabs).indexOf(activeTab);
            const nextTabIndex = (activeTabIndex + 1) % tabs.length;

            activeTab.classList.remove("active");
            phone[activeTabIndex].classList.remove("active");
            play[activeTabIndex].classList.remove("active");

            indicator.style.top = `calc(calc(110%/2)*${nextTabIndex})`
            tabs[nextTabIndex].classList.add("active");
            phone[nextTabIndex].classList.add("active");
            play[nextTabIndex].classList.add("active");
        }
        const switchAnim = setInterval(switcher, 4000);
        tabs.forEach(active => {
            active.addEventListener("click", () => {
                document.querySelector('.active')?.classList.remove('active')
                active.classList.add('active') 
                const activeTab2 = document.querySelector(".content.active");
                const activeTabIndex2 = Array.from(tabs).indexOf(activeTab2);
                if(receive.classList.contains("active")){
                    showReceive()
                    clearInterval(switchAnim)
                    indicator.style.top = `calc(calc(110%/2)*${activeTabIndex2})`
                } 
                if(transfer.classList.contains("active")){
                    showTransfer()
                    clearInterval(switchAnim)
                    indicator.style.top = `calc(calc(110%/2)*${activeTabIndex2})`
                } 
            })
            
        })
    }
    switchState()

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-hero');
                navBar.classList.remove('bkg');
                setTimeout(() => {
                    entry.target.classList.add('show-button');
                }, 1600)
            }
        })
    })
    const hiddenElements = document.querySelectorAll('.hero');
    hiddenElements.forEach((el) => observer.observe(el))

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-ft');
                setTimeout(() => {
                    entry.target.classList.add('show-play');
                }, 1600)
                navBar.classList.add('bkg');
            } else {
                entry.target.classList.remove('show-play');
                entry.target.classList.remove('show-ft');
            }
        })
    })
    const hiddenElements2 = document.querySelectorAll('.ft-cont');
    hiddenElements2.forEach((el) => observer2.observe(el))

    const observer3 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-bvn');
                navBar.classList.add('bkg');
            } else{
                entry.target.classList.remove('show-bvn');
            }
        })
    })
    const hiddenElements3 = document.querySelectorAll('.bvnbox');
    hiddenElements3.forEach((el) => observer3.observe(el))

    const observer4 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-password');
                navBar.classList.add('bkg');
            } else{
                entry.target.classList.remove('show-password');
            }
        })
    })
    const hiddenElements4 = document.querySelectorAll('.passwordbox');
    hiddenElements4.forEach((el) => observer4.observe(el))

    const observer5 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-pin');
                navBar.classList.add('bkg');
            } else{
                entry.target.classList.remove('show-pin');
            }
        })
    })
    const hiddenElements5 = document.querySelectorAll('.pinbox');
    hiddenElements5.forEach((el) => observer5.observe(el))

    const observer6 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navBar.classList.add('bkg');
            }
        })
    })
    const hiddenElements6 = document.querySelectorAll('.ad-box');
    hiddenElements6.forEach((el) => observer6.observe(el))

    const observer7 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-ftM');
                navBar.classList.add('bkg');
            } else {
                entry.target.classList.remove('show-ftM');
            }
        })
    })
    const hiddenElements7 = document.querySelectorAll('.mobile-ft');
    hiddenElements7.forEach((el) => observer7.observe(el))

    const observer8 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-card');
            } else {
                entry.target.classList.remove('show-card');
            }
        })
    })
    const hiddenElements8 = document.querySelectorAll('.cardbox');
    hiddenElements8.forEach((el) => observer8.observe(el))

    const closeVid1 = document.querySelector(".closeVid1")
    const vidOverlay1 = document.querySelector(".vidOverlay")
    closeVid1.addEventListener("click", () => {
        vidOverlay1.style.display = "none";
        Vid1.src = " "
    })
    playVid1.addEventListener("click", () => {
        vidOverlay1.style.display = "flex";
        Vid1.src = 'https://www.youtube.com/embed/ULU9qPXtmso?si=2EBkLlSJsauRq0b_&amp;loop=1&amp;playlist=ULU9qPXtmso&amp;controls=1&amp;mute=1&amp;showinfo=0&amp;frameborder=0&amp;autoplay=1&amp;modestbranding=0&amp;fs=1'
    })

    const closeVid2 = document.querySelector(".closeVid2")
    const vidOverlay2 = document.querySelector(".vidOverlay2")
    closeVid2.addEventListener("click", () => {
        vidOverlay2.style.display = "none";
        Vid2.src = " "
    })
    playVid2.addEventListener("click", () => {
        vidOverlay2.style.display = "flex";
        Vid2.src = 'https://www.youtube.com/embed/3fh-LuA9wjg?si=ZlxP8fsE3u_73V6m&amp;loop=1&amp;playlist=3fh-LuA9wjg&amp;controls=1&amp;mute=1&amp;showinfo=0&amp;frameborder=0&amp;autoplay=1&amp;modestbranding=0&amp;fs=1'
    })

    function isIOSorAndroid() {
        const userAgent = navigator.userAgent.toLowerCase();
        downloadLink.addEventListener ("click", () =>{
            if (/iphone|ipad|ipod/.test(userAgent)) {
                downloadLink.href = "https://apps.apple.com/app/parkway-wallet/id6451072719/"
                return 'iOS';
            } else if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                downloadLink.href = "https://apps.apple.com/app/parkway-wallet/id6451072719/"
            }
        })
    }
    isIOSorAndroid();
})