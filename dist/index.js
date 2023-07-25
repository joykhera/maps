import google from "google-maps";
const api_key = 'AIzaSyAm9ue6sNKh0UOOoiN3l7IP3Tmi4yIQNMM';
const searchParams = {
    latitude: -33.8670522,
    longitude: 151.1957362,
    keyword: 'cruise',
    radius: 1500,
    type: 'restaurant'
};
const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${searchParams.keyword}&location=${searchParams.latitude}%2C${searchParams.longitude}&radius=${searchParams}&type=${searchParams.type}&key=${api_key}`;
const res = await fetch(url);
console.log(res.json());
const { Map } = await google.maps.importLibrary("maps");
// let map: google.maps.Map;
// async function initMap(): Promise<void> {
//     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//     map = new Map(document.getElementById("map") as HTMLElement, {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//     });
// }
// initMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE1BQU0sT0FBTyxHQUFHLHlDQUF5QyxDQUFBO0FBQ3pELE1BQU0sWUFBWSxHQUFHO0lBQ2pCLFFBQVEsRUFBRSxDQUFDLFVBQVU7SUFDckIsU0FBUyxFQUFFLFdBQVc7SUFDdEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixJQUFJLEVBQUUsWUFBWTtDQUNyQixDQUFBO0FBRUQsTUFBTSxHQUFHLEdBQUcsd0VBQXdFLFlBQVksQ0FBQyxPQUFPLGFBQWEsWUFBWSxDQUFDLFFBQVEsTUFBTSxZQUFZLENBQUMsU0FBUyxXQUFXLFlBQVksU0FBUyxZQUFZLENBQUMsSUFBSSxRQUFRLE9BQU8sRUFBRSxDQUFBO0FBRXhPLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFFdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFeEQsNEJBQTRCO0FBQzVCLDRDQUE0QztBQUM1QywwRkFBMEY7QUFDMUYscUVBQXFFO0FBQ3JFLGtEQUFrRDtBQUNsRCxtQkFBbUI7QUFDbkIsVUFBVTtBQUNWLElBQUk7QUFFSixhQUFhIn0=