import {isValidCepFormat, formatCepValue, getJson} from './helpers';

it('validate cep', () => {
    expect(isValidCepFormat('00000')).toEqual(false);
    expect(isValidCepFormat('000000')).toEqual(false);
    expect(isValidCepFormat('00000000')).toEqual(false);
    expect(isValidCepFormat('00000-000')).toEqual(true);
    expect(isValidCepFormat('fooba-baz')).toEqual(false);
    expect(isValidCepFormat('foo')).toEqual(false);
    expect(isValidCepFormat('-')).toEqual(false);
    expect(isValidCepFormat('')).toEqual(false);
    expect(isValidCepFormat()).toEqual(false);
});

it('format cep', () => {
    expect(formatCepValue('00000')).toEqual('00000');
    expect(formatCepValue('000000')).toEqual('00000-0');
    expect(formatCepValue('00000000')).toEqual('00000-000');
    expect(formatCepValue('foo')).toEqual('');
    expect(formatCepValue('-')).toEqual('');
    expect(formatCepValue('')).toEqual('');
});
