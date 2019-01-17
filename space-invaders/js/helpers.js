// Helper Functions

function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw 
        && bx < ax + aw
        && ay < by + bh
        && by < ay + ah;
}