function solution(numbers) {
    numbers.sort((a,b)=>{
        // let q = parseInt(String(b)+String(a));
        // let w = parseInt(String(a)+String(b));
        // return q-w;
        return parseInt(String(b)+String(a))-parseInt(String(a)+String(b));
    });
    return numbers.join("");
}
console.log(solution([0,0,1]));