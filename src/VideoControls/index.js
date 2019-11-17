import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import './style.css';

import { Icon, Grid, Popover, MenuItem, InputLabel, Select } from '@material-ui/core';
import { Pause, PlayArrow, Fullscreen, FullscreenExit, Settings } from '@material-ui/icons';
import { useStore } from '../store';

import VolumeControls from './components/VolumeControls';
import TimeDisplay from './components/TimeDisplay';
import Progress from './components/Progress';

const VideoControls = observer(props => {
	const { showControls, isPlaying, isFullscreen, onClick, toggleFullscreen } = useStore();
	const anchorEl = useRef(null);
	const [open, setOpen] = useState(false)

	return (
		<div className={cx('video-controls', { show: showControls })} {...props}>
			<Grid container direction="column" className="bottom-section">
				<Grid item container direction="row">
					<Progress />
				</Grid>
				<Grid
					container
					item
					direction="row"
					justify="flex-start"
					alignItems="center"
					{...props}
				>
					<Grid item>
						<Icon component={isPlaying ? Pause : PlayArrow} onClick={onClick} />
					</Grid>
					<VolumeControls />
					<TimeDisplay />
					<Grid item className="right-side-icons">
						<Icon ref={anchorEl} component={Settings} fontSize={'small'} onClick={() => {
							setOpen(!open);
						}} />
						<Popover
							open={open}
							anchorEl={anchorEl.current}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							transformOrigin={{
								horizontal: 'center',
								vertical: 'bottom'
							}}
							onClose={() => {
								setOpen(false)
							}}
						>
							<InputLabel id="label">Playback speed</InputLabel>
							<Select labelId="label" id="select" defaultValue="1">
								<MenuItem value="1">1x</MenuItem>
								<MenuItem value="2">2x</MenuItem>
							</Select>
						</Popover>
					</Grid>
					<Grid item>
						<Icon component={isFullscreen ? FullscreenExit : Fullscreen} onClick={toggleFullscreen} />
					</Grid>
				</Grid>
			</Grid>
		</div >
	);
});

export default VideoControls;
