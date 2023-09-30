const url = 'assets/json/daftar-surat-v2.json'
        const urlSurat = 'assets/json/surat-v2/'
        const wrapper = document.querySelector('.wrapper')
        const navLink = document.querySelector('.nav-link')
        const contentBox = document.querySelector('.content-box')
        const searchBox = document.querySelector('.search-box')
        const search = document.getElementById('search')
        const loader = document.querySelector('.loader-box')
        

        function showMenu() {
            navLink.classList.add('menu')
        }
        function closeMenu() {
            navLink.classList.add('menu-close')
            setTimeout(function(){
            navLink.classList.remove('menu')
            navLink.classList.remove('menu-close')
        },1000);
        }

        function suratShow(id) {
            wrapper.classList.add('none')
            loader.classList.remove('none')
            fetch(urlSurat+id+'.json')
            .then((response) => response.json())
            .then((json) => {
                // console.log(json.data.ayat);
                contentBox.classList.remove('list-surat')
                searchBox.innerHTML = ''
                contentBox.innerHTML = `<div class="surat"></div>`
                const surat = document.querySelector('.surat')
                surat.innerHTML += `<h1>${json.data.namaLatin} • <span>${json.data.nama}</span></h1>
                                    <p>${json.data.tempatTurun} • ${json.data.arti} • ${json.data.jumlahAyat} Ayat</p>`

                for ( let i = 0 ; i < json.data.ayat.length; i++) {
                    surat.innerHTML += `<div class="ayat">
                    <h6>${json.data.ayat[i].teksArab}</h6>
                    <p>${json.data.ayat[i].teksLatin}.</p>
                    <hr>
                    <p class="arti">${json.data.ayat[i].nomorAyat}. ${json.data.ayat[i].teksIndonesia}</p>
                </div>`
                // console.log();
                
                }
                // alert('')
                // console.log('finish loading');
                loader.classList.add('none')
                wrapper.classList.remove('none')


                
            });
        }

        function list() {
            wrapper.classList.add('none')
            loader.classList.remove('none')
            fetch(url)
            .then((response) => response.json())
            .then((json) => {
                contentBox.innerHTML = ''
                for (let i = 0; i < json.length; i++) {
                        // console.log(json[i]);
                        contentBox.innerHTML += `<div  onclick="suratShow(${(i+1)})" class="card">
                                                    <div class="latin"><p><span>${json[i].nomor}</span>. <span id="${i}">${json[i].namaLatin}</span></p></div>
                                                    <div class="arab"><p>${json[i].nama}</p></div>
                                                    <div class="keterangan"><p>${json[i].tempatTurun} • ${json[i].arti} • ${json[i].jumlahAyat} Ayat</p></div>
                                                </div>`
                }
                loader.classList.add('none')
                wrapper.classList.remove('none')
            });
        }

        function back() {
            contentBox.classList.add('list-surat')

        }

        // // evnetlistener
        window.addEventListener("load", (event) => {
            list()
            back()
        });
        // search.addEventListener("focusout", (event) => {
        search.addEventListener("keyup", (event) => {
           
            const listAll = document.querySelectorAll('.card')
            let card = document.querySelectorAll('.card')
      
            for (var i = 0; i < card.length; i++) {
                let nomor = document.getElementById(i).innerText

                if (nomor.toLowerCase().replace('-','').replace("'",'').includes(search.value.toLowerCase())) {
                    listAll[i].classList.remove("none");
                } 
                else {
                    listAll[i].classList.add("none");
                }
            }
            
        });