const hendeleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    const categories = data.data.news_category;

    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="hendeleData('${category.category_id}')" class="tab text-2xl p-5 text-red-600 hover:text-white">${category.category_name}</a>
        `
        tabContainer.appendChild(div);
    });

};

const hendeleData = async (createId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${createId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data.forEach((news) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-11/12 mx-auto bg-white text-black shadow-xl">
            <figure><img src="${news?.image_url}" /></figure>
            <div class="card-body py-10 px-3">
                <h2 class="card-title">
                    <p>${news?.title.slice(0, 50)}</p>
                    <button class="btn bg-pink-500 text-white text-base border-none rounded-3xl">${news.rating.badge}</button>
                </h2>
                <p class="py-1">${news?.details.slice(0, 90)}</p>
                <p> Total view : ${news?.total_view}</p>
                <div class="flex justify-between">
                    <div class="flex">
                        <img src="${news?.author.img}" class="w-16 rounded-full">
                        <div class="pl-2">
                            <p>${news?.author.name}</p>
                            <small>${news?.author.published_date}</small>
                        </div>
                    </div>
                    <div>
                        <button onclick="hendelModalData('${news._id}')" class="btn bg-pink-500 text-white text-base border-none rounded-3xl">details</button>
                    </div>
                </div>

            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
};


const hendelModalData = async (newsId) => {
    const response = await fetch(`
    https://openapi.programming-hero.com/api/news/${newsId}
    `)
    const data = await response.json();

    console.log(data.data[0])
    console.log(newsId)
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
            <button class="btn">Close</button>
        </div>
    </form>
</dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1');

    modal.showModal();
}



hendeleCategory();
hendeleData("08")