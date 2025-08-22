// Astrology Generator


const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const moods = ['energetic', 'thoughtful', 'adventurous', 'calm', 'passionate', 'curious', 'optimistic', 'intense', 'playful', 'practical', 'innovative', 'dreamy'];
const traits = [
  {
    name: 'confident',
    summary: 'You approach life with boldness and self-assurance, inspiring others with your fearless attitude.'
  },
  {
    name: 'reliable',
    summary: 'Your dependability makes you a trusted friend and partner, always there when needed.'
  },
  {
    name: 'adaptable',
    summary: 'You thrive in changing environments, easily adjusting to new situations and challenges.'
  },
  {
    name: 'empathetic',
    summary: 'You deeply understand and share the feelings of others, offering comfort and support.'
  },
  {
    name: 'charismatic',
    summary: 'Your magnetic personality draws people to you, making social interactions effortless.'
  },
  {
    name: 'analytical',
    summary: 'You have a keen eye for detail and a logical mind, excelling at problem-solving.'
  },
  {
    name: 'diplomatic',
    summary: 'You navigate conflicts with grace, seeking harmony and understanding among all.'
  },
  {
    name: 'determined',
    summary: 'Your persistence and drive help you overcome obstacles and achieve your goals.'
  },
  {
    name: 'enthusiastic',
    summary: 'Your zest for life is contagious, motivating those around you to embrace new experiences.'
  },
  {
    name: 'disciplined',
    summary: 'You maintain focus and self-control, consistently working toward your ambitions.'
  },
  {
    name: 'visionary',
    summary: 'You see possibilities where others see limitations, always dreaming of a better future.'
  },
  {
    name: 'imaginative',
    summary: 'Your creativity knows no bounds, bringing fresh ideas and inspiration to every endeavor.'
  }
];



const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function generateAstrologyMessage(sign) {
  const mood = getRandom(moods);
  const traitObj = getRandom(traits);
  return `As a ${sign}, your mood today is ${mood} and your key personality trait is ${traitObj.name}.
${traitObj.summary}`;
}


readline.question('Enter your zodiac sign: ', (userSign) => {
  const sign = signs.find(s => s.toLowerCase() === userSign.trim().toLowerCase());
  if (!sign) {
    console.log('Sorry, that is not a recognized zodiac sign.');
    readline.close();
    return;
  }
  const response = generateAstrologyMessage(sign);
  console.log(response);

  // Prepare CSV row
  const csvRow = `"${userSign}","${response.replace(/"/g, '""')}"\n`;
  const csvPath = path.join(__dirname, 'astrology_log.csv');

  // If file doesn't exist, add header first
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'Sign,Response\n');
  }
  fs.appendFileSync(csvPath, csvRow);

  readline.close();
});