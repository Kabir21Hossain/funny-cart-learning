// State configuration to hold all dynamic data
const state = { thriving: [], struggling: [] };
const types = ['all', 'thriving', 'struggling'];

// Helper to grab elements
const getEl = id => document.getElementById(id);

// DOM Elements grouped together
const refs = {
    containers: { all: getEl('plantList'), thriving: getEl('thrivingListContainer'), struggling: getEl('strugglingListContainer') },
    btns: { all: getEl('show-all'), thriving: getEl('show-thriving'), struggling: getEl('show-struggling') },
    counts: { all: getEl('total'), thriving: getEl('thriving'), struggling: getEl('struggling') }
};

// Initialize total count
refs.counts.all.innerText = refs.containers.all.children.length;

// 1. Unified Event Listener for Adding Plants
refs.containers.all.addEventListener('click', e => {
    // Determine the type based on the clicked button's class
    const type = e.target.classList.contains('thriving') ? 'thriving' : 
                 e.target.classList.contains('struggling') ? 'struggling' : null;
    
    if (!type) return;

    // Grab specific plant info using the parent container
    const el = e.target.closest('.plantCard'); 
    const plantInfo = {
        name: el.querySelector('#plantName').innerText,
        latin: el.querySelector('#plantLatinName').innerText,
        status: el.querySelector('#plantStatus').innerText,
        note: el.querySelector('#plantNote').innerText
    };

    // Check for duplicates
    if (state[type].some(p => p.name === plantInfo.name)) return alert('Already added');

    // Add to state and update the counter UI
    state[type].push(plantInfo);
    refs.counts[type].innerText = state[type].length;
});

// 2. Unified Tab Navigation
types.forEach(type => {
    refs.btns[type].addEventListener('click', () => {
        // Iterate over all 3 types to update classes and visibility dynamically
        types.forEach(t => {
            const isActive = t === type;
            
            // Toggle active styles on buttons
            refs.btns[t].className = `px-4 py-3 rounded-md mr-3 cursor-pointer ${isActive ? 'bg-black text-white' : 'bg-gray-400'}`;
            // Toggle visibility of the list containers
            refs.containers[t].classList.toggle('hidden', !isActive);
        });

        // Re-render the container content for the active tab (if it isn't 'all')
        if (type !== 'all') renderList(type);
    });
});

// 3. Dynamic Renderer for filtering lists
function renderList(type) {
    // Instead of using document.createElement line-by-line, '.map().join()' applies templates elegantly and correctly
    refs.containers[type].innerHTML = state[type].map(plant => `
        <div class="plantCard flex justify-between shadow-xl px-5 py-4 rounded-md mb-5">
            <div class="plantInfo space-y-2">
                <h2 class="text-2xl font-semibold">${plant.name}</h2>
                <h4 class="text-gray-400 font-lg">${plant.latin}</h4>

                <div class="status mt-4 flex gap-4">
                    <button class="px-4 py-2 bg-gray-300 text-gray-500 font-bold">Bright Indicate</button>
                    <button class="px-4 py-2 bg-gray-300 text-gray-500 font-bold">Weekly Water</button>
                </div>

                <button class="mt-3 border-2 border-gray-300 px-14 py-2 text-center text-gray-500">${plant.status}</button>
                <p class="text-gray-500 font-semibold mb-5">${plant.note}</p>

                <button class="thriving border-2 px-4 py-2 text-green-400 font-bold cursor-pointer">Thriving</button>
                <button class="struggling border-2 px-4 py-2 text-red-400 font-bold cursor-pointer">Struggling</button>
            </div>
            <div class="delete">
                <button class="bg-red-200 px-4 py-2 text-red-900 font-bold rounded-b-none">Delete</button>
            </div>
        </div>
    `).join('');
}
