console.log('hello world');

const handelCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    const news = data.data.news_category.slice(0,3)
    //console.log(news);
    const tapContainer = document.getElementById('tap-container');
    news.forEach(category => {
        //console.log(category);
        const createDiv = document.createElement('div')
        createDiv.innerHTML=`
        <a onclick = " DisplayLoad('${category.category_id}')" class="tab text-xl text-white">${category.category_name}</a> 
        
        `
        tapContainer.appendChild(createDiv)
    });

}


const DisplayLoad = async (categoryId) =>{
    const response = await fetch (`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json();
    const cardNews = data.data;
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ''
    cardNews.forEach(news => {
       // console.log(news);

        const createDiv = document.createElement('div')

        createDiv.innerHTML = `
        <div class="card  bg-gray-100 shadow-xl">
        <figure>
          <img
            src="${news.thumbnail_url
            }"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
        <h2 class="card-title">
        ${news.author?.name}
        <div class="badge badge-secondary p-5">Excellent</div>
      </h2>
          <p>
          ${news?.details.slice(0,80)}
         
          </p>
          <p> Total view:  ${news.total_view? news.total_view : "No View" }  </p>
          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>Jimmy Dane</h6>
                <small>2022-08-24 17:27:34</small>
              </div>
            </div>
            <div class="card-detaild-btn">
              <button onclick="handelModal('${news._id}')"
                class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
              >
                Details
              </button>
            </div>
          </div>
        </div>
                </div>
        `

        newsContainer.appendChild(createDiv)
    })
    

   

}

const handelModal = async (newsId)=>{
    const response = await fetch (`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json();
   const modalData = data.data[0].author
    console.log(modalData);

    const modalContainer = document.getElementById('modal-container');

   const div = document.createElement('div')
   
   div.innerHTML =`
   <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                    <form method="dialog" class="modal-box">
                        <h3 class="font-bold text-lg">${modalData.name}</h3>
                        <p class="py-4">${modalData.published_date}</p>
                        <img class = "w-52 item-" src="${modalData.img}" alt="">
                        <div class=" ">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </div>
                    </form>
                </dialog>

   `

   modalContainer.appendChild(div)
   my_modal_5.showModal()
}


handelCategory()
DisplayLoad("01")
