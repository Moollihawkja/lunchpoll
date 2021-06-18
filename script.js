async function grabData() {
	const resp = await fetch('/~/lunchpoll/open/lunch?all=true')
	const json = await resp.json();
	const results = document.querySelector('div');
	
	// Generate array of emojis from option elements
	const emojis = [...document.querySelectorAll('option')].map(option => option.value);
	
	// Find the number of times an emoji was chosen
	const counts = {};
	emojis.forEach(emoji => {
		counts[emoji] = json.filter(choice => choice.data.choice === emoji).length
	})
	
	// Convert our counts into an HTML table
	emojis.forEach(emoji => {
		const count = counts[emoji];
		const div = document.createElement('div');
		const emojis = []; 
		while(emojis.length < count) {
			emojis.push(emoji);
		}
		div.className = 'row'
		div.innerHTML = `
			<div class='emojis'>${emojis}</div>
			<div class='count'>${count}</div>
		`
		results.appendChild(div);
	})
	
	// results.innerHTML = '<pre>' + JSON.stringify(counts, null, 4) + '</pre>'
}

grabData();