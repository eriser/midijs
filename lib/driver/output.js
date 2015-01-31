/*jslint node:true, browser:true, bitwise:true */

'use strict';

/**
 * Output wrapper
 *
 * Add helper methods to ease working with
 * native MIDI outputs.
 *
 * @param {send: Function}  Function to send MIDI messages to the output to be
 *                          wrapped around.
 */
function Output(send) {
    this.send = send || function () {
        return undefined;
    };
}

/**
 * Release a note on a channel
 *
 * Send a MIDI message to release a note given channel, after
 * given delay.
 *
 * @param {channel: int}    Channel ID
 * @param {program: int}    Note ID (0 - 127)
 * @param {velocity: int}   Pressing velocity (0 - 127)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.noteOff = function (channel, note, velocity, delay) {
    this.send([0x80 + channel, note, velocity], delay || 0);
};

/**
 * Press a note on a channel
 *
 * Send a MIDI message to press a note on given channel, with
 * given velocity, after given delay.
 *
 * @param {channel: int}    Channel ID (0 - 15)
 * @param {note: int}       Note ID (0 - 127)
 * @param {velocity: int}   Pressing velocity (0 - 127)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.noteOn = function (channel, note, velocity, delay) {
    this.send([0x90 + channel, note, velocity], delay || 0);
};

/**
 * Set note aftertouch on a channel
 *
 * Send a MIDI message to change note pressure, after given delay,
 * on given channel.
 *
 * @param {channel: int}    Channel ID
 * @param {program: int}    Note ID (0 - 127)
 * @param {pressure: int}   Pressure amount (0 - 127)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.noteAftertouch = function (channel, note, pressure, delay) {
    this.send([0xA0 + channel, note, pressure], delay || 0);
};

/**
 * Apply a controller to a channel
 *
 * Send a MIDI message to change channel state using
 * a controller, after given delay (see Output.controllers for
 * a list of controllers).
 *
 * @param {channel: int}    Channel ID
 * @param {controller: int} Controller type (0 - 127)
 * @param {value: int}      Controller value (0 - 127)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.controller = function (channel, controller, value, delay) {
    this.send([0xB0 + channel, controller, value], delay || 0);
};

/**
 * Change program on a channel
 *
 * Send a MIDI message to change program on given channel, after
 * given delay.
 *
 * @param {channel: int}    Channel ID (0 - 15)
 * @param {program: int}    Program ID (0 - 127; see programs.js)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.programChange = function (channel, program, delay) {
    this.send([0xC0 + channel, program], delay || 0);
};

/**
 * Set global note aftertouch on a channel
 *
 * Send a MIDI message to change all notes pressure,
 * after given delay, on given channel.
 *
 * @param {channel: int}    Channel ID
 * @param {pressure: int}   Pressure amount (0 - 127)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.channelAftertouch = function (channel, pressure, delay) {
    this.send([0xD0 + channel, pressure], delay || 0);
};

/**
 * Increase or decrease pitch on a channel
 *
 * Send a MIDI message to increase or decrease pitch value, after given delay,
 * on given channel.
 *
 * @param {channel: int}    Channel ID
 * @param {value: int}      Pitch variation (-8192 - 8191)
 * @param {delay: int}      Delay in milliseconds
 */
Output.prototype.pitchBend = function (channel, value, delay) {
    var lsb, msb;

    value += 8192;
    lsb = value & 127;
    msb = value >> 7;

    this.send([0xE0 + channel, lsb, msb], delay || 0);
};

module.exports = Output;