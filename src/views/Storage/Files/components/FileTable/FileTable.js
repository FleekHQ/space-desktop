import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table, { TableCell, TableRow, FileCell } from '@ui/Table';
import Dropzone from '@shared/components/Dropzone';
import { formatBytes } from '@utils';
import { useUploadEvent } from '@shared/hooks';

import useStyles from './styles';

const FileTable = (props) => {
  const {
    rows,
    onClick,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const onUpload = useUploadEvent();

  const head = [
    {
      label: t('modules.storage.fileTable.head.name'),
      width: '41%',
    },
    {
      label: t('modules.storage.fileTable.head.members'),
      width: '29%',
    },
    {
      label: t('modules.storage.fileTable.head.lastModified'),
    },
    {
      label: '', width: 43,
    },
  ];

  /* eslint-disable react/prop-types */
  const renderHead = ({ _head = [] }) => (
    <TableRow>
      {_head.map(({ label, width }) => (
        <TableCell key={label} className={classes.headerCell} width={width}>
          <Typography variant="body2">
            {label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );

  const renderRow = ({ row }) => (
    <TableRow
      hover
      key={row.id}
      className={classes.row}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(row);
      }}
    >
      <FileCell ext={row.ext} src={`file:${row.key}`}>
        <Typography variant="body1" noWrap>
          {row.name}
        </Typography>
      </FileCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {formatBytes(row.size)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="secondary" noWrap>
          {moment(row.lastModified).format('MMM d, YYYY hh:mm:ss A z')}
          {/* ^ just for testing, after POC should be used line below */}
          {/* {formatMonthDayYear(row.lastModified)} */}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Button
          className={classes.options}
          color="secondary"
          disableRipple
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>
      </TableCell>
    </TableRow>
  );
  /* eslint-enable react/prop-types */

  return (
    <Dropzone
      disableClick
      onDrop={onUpload}
      classes={{ root: classes.dropzone, active: classes.dropzoneActive }}
    >
      <Table
        head={head}
        rows={rows}
        renderRow={renderRow}
        renderHead={renderHead}
        className={classes.root}
      />
    </Dropzone>
  );
};

FileTable.defaultProps = {
  rows: [],
  onClick: () => {},
};

FileTable.propTypes = {
  onClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    ext: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    lastModified: PropTypes.instanceOf(Date),
  })),
};

export default FileTable;
