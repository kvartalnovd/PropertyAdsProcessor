import img from '../img/img.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
const cards = [
    {
        id: 1,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 2,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 3,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 4,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 5,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 6,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 7,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 8,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 9,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 10,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 11,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 12,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 13,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 14,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 15,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 16,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 17,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 18,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 19,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 20,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 21,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 22,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 23,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 24,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 25,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 26,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 27,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 28,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 29,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 30,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 31,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 32,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 33,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 34,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 35,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
    {
        id: 36,
        img_url: img,
        number: '599777702',
        reference: 'ttps://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508715',
        date: '01.05.22 10:10',
        status: 1
    },
    {
        id: 37,
        img_url: img2,
        number: '599777702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-1-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4676736',
        date: '01.05.22 10:11',
        status: 1
    },
    {
        id: 38,
        img_url: img3,
        number: '599777704',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B4%D0%B0%D1%87%D0%B0-%D0%B1%D0%B0%D0%BA%D1%83%D1%80%D0%B8%D0%B0%D0%BD%D0%B8-4508758',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 39,
        img_url: img4,
        number: '599763702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC-%D0%B1%D0%BE%D1%80%D0%B6%D0%BE%D0%BC%D0%B8-4974075',
        date: '01.05.22 10:13',
        status: 1
    },
    {
        id: 40,
        img_url: img4,
        number: '594627702',
        reference: 'https://ss.ge/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0--%D0%B7%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%B4%D0%B0%D1%87%D0%B0-%D1%86%D0%B5%D0%BC%D0%B8-4973967',
        date: '01.05.22 10:14',
        status: 1
    },
]

export function getData(page_size, current_page){
    let start = page_size * (current_page - 1)
    if (start >= cards.length){
        return []
    }
    let end = start + page_size > cards.length ? cards.length : start + page_size
    return cards.slice(start, end)
}