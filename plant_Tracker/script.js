let thrivingList = []
let strugglingList = []

const thrivingListcontainer = document.getElementById('thrivingListContainer');
const strugglingListcontainer = document.getElementById('strugglingListContainer');

const showAllBtn = document.getElementById('show-all');
const showThrivingBtn = document.getElementById('show-thriving');
const showStrugglingBtn = document.getElementById('show-struggling');


let plantList = document.getElementById("plantList");
let total = document.getElementById('total');
let thriving = document.getElementById('thriving');
let struggling = document.getElementById('struggling');
total.innerText = plantList.children.length;


plantList.addEventListener('click', function (event) {
    if (event.target.classList.contains('thriving')) {
        prepareProduct(event.target.parentNode, 'thriving');
        thriving.innerText = thrivingList.length;
    }
    if (event.target.classList.contains('struggling')) {
        prepareProduct(event.target.parentNode, 'struggling');
        struggling.innerText = strugglingList.length;
    }


});


function prepareProduct(element, type) {
    const plantName = element.querySelector('#plantName').innerText;
    const plantLatinName = element.querySelector('#plantLatinName').innerText;
    const plantStatus = element.querySelector('#plantStatus').innerText;
    const plantNote = element.querySelector('#plantNote').innerText;

    const plantInfo = {
        plantName,
        plantLatinName,
        plantStatus,
        plantNote
    }

    if (type === 'thriving') {
        const nameCheck = thrivingList.find(item => item.plantName === plantInfo.plantName);
        if (nameCheck) {
            alert('Already added');
            return;
        }
        thrivingList.push(plantInfo);
    }
    else {
        const nameCheck = strugglingList.find(item => item.plantName === plantInfo.plantName);
        if (nameCheck) {
            alert('Already added');
            return;
        }
        strugglingList.push(plantInfo);
    }


}



// toggoling creation

showAllBtn.addEventListener('click', () => updateBtn('all'));
showThrivingBtn.addEventListener('click', () => updateBtn('thriving'));
showStrugglingBtn.addEventListener('click', () => updateBtn('struggling'));

function updateBtn(type) {
    if (type === 'all') {
        showAllBtn.classList.remove('bg-gray-400');
        showAllBtn.classList.add('bg-black', 'text-white');
        showThrivingBtn.classList.remove('bg-black', 'text-white');
        showThrivingBtn.classList.add('bg-gray-400');
        showStrugglingBtn.classList.remove('bg-black', 'text-white');
        showStrugglingBtn.classList.add('bg-gray-400');
        plantList.classList.remove('hidden');
        thrivingListcontainer.classList.add('hidden');
        strugglingListcontainer.classList.add('hidden');
        
    }
    if (type === 'thriving') {
        showAllBtn.classList.remove('bg-black', 'text-white');
        showAllBtn.classList.add('bg-gray-400');
        showThrivingBtn.classList.remove('bg-gray-400');
        showThrivingBtn.classList.add('bg-black', 'text-white');
        showStrugglingBtn.classList.remove('bg-black', 'text-white');
        showStrugglingBtn.classList.add('bg-gray-400');
        plantList.classList.add('hidden');
        thrivingListcontainer.classList.remove('hidden');
        strugglingListcontainer.classList.add('hidden');
        // plantList.style.display='block';
        renderThrivingList();
    }
    if (type === 'struggling') {
        showAllBtn.classList.remove('bg-black', 'text-white');
        showAllBtn.classList.add('bg-gray-400');
        showThrivingBtn.classList.remove('bg-black', 'text-white');
        showThrivingBtn.classList.add('bg-gray-400');
        showStrugglingBtn.classList.remove('bg-gray-400');
        showStrugglingBtn.classList.add('bg-black', 'text-white');
        plantList.classList.add('hidden');
        thrivingListcontainer.classList.add('hidden');
        strugglingListcontainer.classList.remove('hidden');
        renderStrugglingList();
    }
}


function renderThrivingList() {

    thrivingListcontainer.classList.remove('hidden');

    plantList.classList.add('hidden');
    strugglingListcontainer.classList.add('hidden');

    thrivingListcontainer.innerHTML = '';

    thrivingList.forEach(plant => {
        const plantElement = document.createElement('div');
        plantElement.className = 'plantCard flex justify-between shadow-xl px-5 py-4 rounded-md mb-5';
        plantElement.innerHTML = `

        <div class="plantInfo space-y-2">
                        <h2 class="text-2xl font-semibold" id="plantName">${plant.plantName}</h2>
                        <h4 class="text-gray-400 font-lg" id="plantLatinName">${plant.plantLatinName}</h4>

                        <div class="status mt-4 flex gap-4">
                            <button class="px-4 py-2 bg-gray-300  text-gray-500 font-bold">Bright Indicate</button>
                            <button class="px-4 py-2 bg-gray-300  text-gray-500 font-bold">Weekly Water</button>
                        </div>

                    
                        <button class="mt-3 border-2 border-gray-300 px-14 py-2 text-center text-gray-500" id="plantStatus">No Applicable</button>
                        
                        <p class="text-gray-500 font-semibold mb-5 " id="plantNote">New leaf unfurling by the east window</p>

                            <button class=" thriving border-2 px-4 py-2 text-green-400 font-bold cursor-pointer">Thriving</button>
                            <button class=" struggling border-2 px-4 py-2 text-red-400 font-bold cursor-pointer">Struggling</button>
                        

                    </div>

                    <!-- card 2nd child -->
                    <div class="delete">
                        <button class="bg-red-200 px-4 py-2 text-red-900 font-bold rounded-b-none">Delete</button>
                    </div>

        
        `
        thrivingListcontainer.appendChild(plantElement);
    });


}

function renderStrugglingList(){
    strugglingListcontainer.classList.remove('hidden');
    plantList.classList.add('hidden');
    thrivingListcontainer.classList.add('hidden');
    strugglingListcontainer.innerHTML = '';
    strugglingList.forEach(plant => {
        const plantElement = document.createElement('div');
        plantElement.className = 'plantCard flex justify-between shadow-xl px-5 py-4 rounded-md mb-5';
        plantElement.innerHTML = `

        <div class="plantInfo space-y-2">
                        <h2 class="text-2xl font-semibold" id="plantName">${plant.plantName}</h2>
                        <h4 class="text-gray-400 font-lg" id="plantLatinName">${plant.plantLatinName}</h4>

                        <div class="status mt-4 flex gap-4">
                            <button class="px-4 py-2 bg-gray-300  text-gray-500 font-bold">Bright Indicate</button>
                            <button class="px-4 py-2 bg-gray-300  text-gray-500 font-bold">Weekly Water</button>
                        </div>

                    
                        <button class="mt-3 border-2 border-gray-300 px-14 py-2 text-center text-gray-500" id="plantStatus">No Applicable</button>
                        
                        <p class="text-gray-500 font-semibold mb-5 " id="plantNote">New leaf unfurling by the east window</p>

                            <button class=" thriving border-2 px-4 py-2 text-green-400 font-bold cursor-pointer">Thriving</button>
                            <button class=" struggling border-2 px-4 py-2 text-red-400 font-bold cursor-pointer">Struggling</button>
                        

                    </div>

                    <!-- card 2nd child -->
                    <div class="delete">
                        <button class="bg-red-200 px-4 py-2 text-red-900 font-bold rounded-b-none">Delete</button>
                    </div>

        
        `
        strugglingListcontainer.appendChild(plantElement);
    });


}

