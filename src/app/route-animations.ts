import {
  trigger,
  transition,
  style,
  query,
  group,
  // animateChild,
  animate,
  keyframes,
  // stagger,
} from '@angular/animations';

// https://github.com/fireship-io/165-angular-router-animations/tree/master/src/app
// https://angular.io/guide/complex-animation-sequences

// https://angular.io/guide/route-animations

export const login =
  trigger('login', [

    transition('* => *', [

      query(':enter',
        [
          style({ opacity: 0 })
        ],
        { optional: true }
      ),

      query(':leave',
        [
          style({ opacity: 1 }),
          animate('0.40s', style({ opacity: 0 }))
        ],
        { optional: true }
      ),

      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.40s', style({ opacity: 1 }))
        ],
        { optional: true }
      )

    ])

  ]);


export const fader =
  trigger('fader', [
    transition('* => *', [
      query(':enter, :leave',
        style({
          position: 'relative',
          width: '100%'
        }),
        { optional: true }),
      group([
        query(':enter', [
          style({
            position: 'absolute',
            top: '65px',
            left: 0,
            width: '100%',
            opacity: 0
          }),
          animate('1.5s ease-in',
            style({
              opacity: 1,
            })
          )
        ], { optional: true }),
        query(':leave', [
          style({
            position: 'absolute',
            top: '65px',
            left: 0,
            width: '100%',
            opacity: 1,
          }),
          animate('1s ease-out',
            style({
              opacity: 0
            })
          )
        ], { optional: true }),
      ]),
    ])
  ]);


export const slideLeft =
  trigger('slideLeft', [
    transition('* => *', [
      query(':enter, :leave',
        style({
          position: 'relative',
          width: '100%',

        }),
        { optional: true }),
      group([
        query(':enter', [
          style({
            transform: 'translateX(100%)',
            position: 'absolute',
            top: '65px',
            left: 0,
            width: '100%',

          }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({
            transform: 'translateX(0%)',
            position: 'absolute',
            top: '65px',
            left: 0,
            width: '100%',

          }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ]),
    ])
  ]);

// export const slideLeft =
//   trigger('slideLeft', [
//     transition('* <=> *', [
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: '65px',
//           left: 0,
//           width: '100%',
//         }),
//       ], { optional: true }),
//       group([
//         query(':enter', [
//           animate('2000ms ease', keyframes([
//             style({ 'clip-path': 'circle(0)' }),
//             style({ 'clip-path': 'circle(100%)' }),
//           ])),
//         ], { optional: true }),
//         query(':leave', [
//           animate('0ms ease', keyframes([
//             // style({ 'clip-path': 'circle(100%)' }),
//             // style({ 'clip-path': 'circle(0%)' }),
//             style({ opacity: 0 }),
//           ])),
//         ], { optional: true })
//       ]),
//     ])

//   ]);


// export const slideLeft =
//   trigger('slideLeft', [
//     transition('* <=> *', [
//       /* order */
//       /* 1 */ query(':enter, :leave', [], { optional: true }),
//       /* 2 */ query('.block', style({ opacity: 0 }), { optional: true }),
//       /* 3 */ group([  // block executes in parallel
//         query(':enter', [], { optional: true }),
//         query(':leave', [], { optional: true }),
//       ]),
//       /* 4 */ query(':enter .block', stagger(400, [
//         style({ transform: 'translateY(100px)' }),
//         animate('1s ease-in-out',
//           style({ transform: 'translateY(0px)', opacity: 1 }))
//       ]), { optional: true }),
//     ])
//   ]);


// Positioned

// export const slider =
//   trigger('routeAnimations', [
//     transition('* => isLeft', slideTo('left')),
//     transition('* => isRight', slideTo('right')),
//     transition('isRight => *', slideTo('left')),
//     transition('isLeft => *', slideTo('right'))
//   ]);


// export const transformer =
//   trigger('routeAnimations', [
//     transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 })),
//     transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 })),
//     transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 })),
//     transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 }))
//   ]);




// function slideTo(direction) {
//   const optional = { optional: true };
//   return [
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         top: 0,
//         [direction]: 0,
//         width: '100%'
//       })
//     ], optional),
//     query(':enter', [
//       style({ [direction]: '-100%' })
//     ]),
//     group([
//       query(':leave', [
//         animate('600ms ease', style({ [direction]: '100%' }))
//       ], optional),
//       query(':enter', [
//         animate('600ms ease', style({ [direction]: '0%' }))
//       ])
//     ]),
//     // Normalize the page style... Might not be necessary

//     // Required only if you have child animations on the page
//     // query(':leave', animateChild()),
//     // query(':enter', animateChild()),
//   ];
// }


// function translateTo({ x = 100, y = 0, rotate = 0 }) {
//   const optional = { optional: true };
//   return [
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%'
//       })
//     ], optional),
//     query(':enter', [
//       style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` })
//     ]),
//     group([
//       query(':leave', [
//         animate('600ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` }))
//       ], optional),
//       query(':enter', [
//         animate('600ms ease-out', style({ transform: `translate(0, 0) rotate(0)` }))
//       ])
//     ]),
//   ];
// }


// // Keyframes

// export const slideLeft =
//   trigger('slideLeft', [
//     transition('* <=> *', [
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: '65px',
//           left: 0,
//           width: '100%',
//         }),
//       ], { optional: true }),
//       group([
//         query(':enter', [
//           animate('2000ms ease', keyframes([
//             style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
//             style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
//             style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
//           ])),
//         ], { optional: true }),
//         query(':leave', [
//           animate('2000ms ease', keyframes([
//             style({ transform: 'scale(1)', offset: 0 }),
//             style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
//             style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
//           ])),
//         ], { optional: true })
//       ]),
//     ])

//   ]);
