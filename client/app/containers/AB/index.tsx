import * as React from 'react';
import * as Redux from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Children } from 'react';
import { getSession, setSession } from './../App';

export interface IVariationProps {
  selector: string;
}

export class Variation extends React.Component<IVariationProps> {
  constructor(props: IVariationProps) {
    super(props);
  }

  render() {
    return (
      <div>
        {Children.toArray(this.props.children)}
      </div>
    );
  }
}

declare interface IABProps {
  experiment: string;
}

export class AB extends React.Component<IABProps> {
  variations: React.ReactChild[];
  selectedVariation: React.ReactChild;

  constructor(props: IABProps) {
    super(props);
  }

  runTest() {
    const variation = getSession(this.props.experiment);
    this.variations = Children.toArray(this.props.children)
      .map((v) => {
        v['type'].prototype.constructor.displayName === 'Variation';
        return v;
      });

    if (!variation) {
      const random:number = this.getRandomNumber(this.variations.length - 1);
      this.selectedVariation = this.variations[random];
      setSession(this.props.experiment, this.selectedVariation['props'].selector);
    } else {
      this.selectedVariation = this.variations.filter((v) => {
        return v['props'].selector === variation;
      })[0];
    }

    return Children.toArray(this.selectedVariation);
  }

  getRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  render() {
    return (
      <div>
        {this.runTest()}
      </div>
    );
  }
}