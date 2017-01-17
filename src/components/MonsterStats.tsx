import * as React from 'react';
import { connect } from 'react-redux';

import MonsterBuilder from './monster-builder/MonsterBuilder';

interface MonsterStatsProps
{
    monsterName: string,
}

class MonsterStats extends React.Component<MonsterStatsProps, any>
{
  render() {
    const { monsterName } = this.props;

    return (
      <MonsterBuilder monsterName={monsterName} />
    );
  }
}

export default MonsterStats;
