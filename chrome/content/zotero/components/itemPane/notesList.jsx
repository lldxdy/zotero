/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2020 Corporation for Digital Scholarship
                     Vienna, Virginia, USA
                     https://www.zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import cx from 'classnames';

const NoteRow = ({ title, body, date, onClick, parentItemType, parentTitle }) => {
	return (
		<div className={cx('note-row', { 'standalone-note-row': !parentItemType })} onClick={onClick}>
			<div className="inner">
				{ parentItemType
					? <div className="parent-line">
						<img className="parent-item-type" src={Zotero.ItemTypes.getImageSrc(parentItemType)} />
						<span className="parent-title">{parentTitle}</span>
					</div>
					: null
				}
				<div className="title-line">
					<div className="title">{title}</div>
				</div>
				<div className="body-line">
					<div className="date">{date}</div>
					<div className="body">{body}</div>
				</div>
			</div>
		</div>
	);
};

const NotesList = forwardRef(({ onClick }, ref) => {
	const [notes, setNotes] = useState([]);
	useImperativeHandle(ref, () => ({ setNotes }));
	let currentChildNotes = notes.filter(x => x.isCurrentChild);
	let allNotes = notes.filter(x => !x.isCurrentChild);
	return (
		<div className="notes-list">
			<section>
				{!!currentChildNotes.length && <h2>{Zotero.getString('pane.context.itemNotes')}</h2>}
				{currentChildNotes.map(note => <NoteRow key={note.id} {...note} onClick={() => onClick(note.id)}/>)}
			</section>
			<section>
				{!!allNotes && <h2>{Zotero.getString('pane.context.allNotes')}</h2>}
				{allNotes.map(note => <NoteRow key={note.id} {...note} onClick={() => onClick(note.id)}/>)}
			</section>
		</div>
	);
});

export default NotesList;
