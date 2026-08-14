const source = document.body.dataset.source;

fetch(source)
  .then((response) => response.text())
  .then((text) => {
    const root = document.querySelector('.pub-list');
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const isSectionName = (line) => /^(Journal|Conference|Patents|Seminars and Talk)$/i.test(line);
    const isAuthorship = (line) => /^\*Corresponding Authorship$/i.test(line) || /Co-First Author$/i.test(line) || /^Bold: AMPLIA Member$/i.test(line);
    const isStatus = (line) => /^\(/.test(line) || /^Registered |^Applied |^Domestic Conferences/.test(line);
    const isYear = (line) => /^(~?\d{4})$/.test(line);
    let itemNumber = lines.filter((line) => !isSectionName(line) && !isAuthorship(line) && !isStatus(line) && !isYear(line)).length;

    lines.forEach((line) => {
      if (isSectionName(line)) return;

      if (isAuthorship(line) || isStatus(line)) {
        const note = document.createElement('div');
        note.className = `note ${isAuthorship(line) ? 'note-authorship' : 'note-status'}`;
        note.textContent = /Co-First Author$/i.test(line) ? '†Co-First Author' : line;
        root.append(note);
        return;
      }

      if (isYear(line)) {
        const heading = document.createElement('h3');
        heading.textContent = line;
        root.append(heading);
        return;
      }

      const article = document.createElement('article');
      const number = document.createElement('span');
      number.textContent = String(itemNumber).padStart(2, '0');
      const copy = document.createElement('p');
      copy.textContent = line;
      article.append(number, copy);
      root.append(article);
      itemNumber -= 1;
    });
  })
  .catch(() => {
    document.querySelector('.pub-list').textContent = 'Content is being prepared.';
  });
