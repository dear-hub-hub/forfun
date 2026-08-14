const source = document.body.dataset.source;

fetch(source)
  .then((response) => response.text())
  .then((text) => {
    const root = document.querySelector('.pub-list');
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const isSectionName = (line) => /^(Journal|Conference|Patents|Seminars and Talk)$/i.test(line);
    const isAuthorship = (line) => /^\*\s*Corresponding Authorship$/i.test(line) || /Co-First Author$/i.test(line) || /^Bold: AMPLIA Member$/i.test(line);
    const isAccepted = (line) => /^\(Accepted\)/i.test(line);
    const isDomesticHeading = (line) => /^Domestic Conferences$/i.test(line);
    const isPatentHeading = (line) => /^(Registered US Patents|Applied US Patents|Registered Domestic Patents|Applied Domestic Patents)$/i.test(line);
    const isPatentPage = source === 'patents.txt';
    const isTalkPage = source === 'talks.txt';
    const isStatus = (line) => /^\(/.test(line) && !isAccepted(line);
    const isYear = (line) => /^(~?\d{4})$/.test(line);
    const domesticIndex = lines.findIndex(isDomesticHeading);
    const isArticle = (line) => !isSectionName(line) && !isAuthorship(line) && !isStatus(line) && !isYear(line) && !isDomesticHeading(line) && !isPatentHeading(line);
    let internationalNumber = lines.filter((line, index) => isArticle(line) && (domesticIndex < 0 || index < domesticIndex)).length;
    let domesticNumber = domesticIndex < 0 ? 0 : lines.filter((line, index) => index > domesticIndex && isArticle(line)).length;
    let inDomesticSection = false;

    lines.forEach((line) => {
      if (isSectionName(line)) return;

      if (isDomesticHeading(line)) {
        inDomesticSection = true;
        const heading = document.createElement('h3');
        heading.className = 'domestic-heading';
        heading.textContent = 'Domestic Conferences';
        root.append(heading);
        return;
      }

      if (isPatentHeading(line)) {
        const heading = document.createElement('h3');
        heading.className = 'patent-heading';
        heading.textContent = line;
        root.append(heading);
        return;
      }

      if (isAuthorship(line) || isStatus(line)) {
        const note = document.createElement('div');
        note.className = `note ${isAuthorship(line) ? 'note-authorship' : 'note-status'}`;
        note.textContent = /Co-First Author$/i.test(line) ? '†Co-First Author' : /^\*\s*Corresponding Authorship$/i.test(line) ? '*Corresponding Authorship' : line;
        root.append(note);
        return;
      }

      if (isYear(line)) {
        if (isTalkPage) return;
        const heading = document.createElement('h3');
        heading.textContent = line;
        root.append(heading);
        return;
      }

      const article = document.createElement('article');
      const copy = document.createElement('p');
      copy.textContent = line;
      if (isPatentPage) {
        article.className = 'unnumbered';
        article.append(copy);
      } else {
        const number = document.createElement('span');
        number.textContent = String(inDomesticSection ? domesticNumber : internationalNumber).padStart(2, '0');
        article.append(number, copy);
      }
      root.append(article);
      if (inDomesticSection) domesticNumber -= 1;
      else internationalNumber -= 1;
    });
  })
  .catch(() => {
    document.querySelector('.pub-list').textContent = 'Content is being prepared.';
  });
