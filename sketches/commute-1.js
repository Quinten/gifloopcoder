function onGLC(glc) {
    glc.loop();
//     glc.size(400, 400);
//     glc.setDuration(5);
//     glc.setFPS(20);
    glc.setMode('single');
    glc.setEasing(false);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;


    var fl = 400;
    var vpX = width / 2;
    var vpY = height / 2;

    var p = new Array();
    var numPoints = 256;
    var lineSize = 64;
    var Lx = 0, 
        Ly = 0, 
        Lz = 0; 
    var q = (height > width) ? width/2 : height/2;
    for (var i = 0; i<numPoints; i++) {
	    p[i] = new Object();
	    d=Math.round(Math.random())?lineSize:-lineSize;
	    r=Math.random()*3;
	    if(r>2)Lx=(Lx+d>q||Lx+d<-q)?-Lx/2:Lx+d;
	    if(r<1)Ly=(Ly+d>q||Ly+d<-q)?-Ly/2:Ly+d;
	    if(r<2&&r>1)Lz=(Lz>q||Lz<-q)?-Lz/2:Lz+d;
	    p[i].x =  Lx;
	    p[i].y = Ly;
	    p[i].z = Lz;
    }

	var angleY = Math.random();
	var cosY = Math.cos(angleY);
	var sinY = Math.sin(angleY);

	var angleX = Math.random();
	var cosX = Math.cos(angleX);
	var sinX = Math.sin(angleX);

	for (var i=0;i<numPoints;i++) {

		var x1 = p[i].x * cosY - p[i].z * sinY;
		var z1 = p[i].z * cosY + p[i].x * sinY;

		var y1 = p[i].y * cosX - z1 * sinX;
		var z2 = z1 * cosX + p[i].y * sinX;

		p[i].x = x1;
		p[i].y = y1;
		p[i].z = z2;

		var scale = fl / (fl + p[i].z);
		p[i]._x = vpX + p[i].x * scale;
		p[i]._y = vpY + p[i].y * scale;
	}
    
	for (var i=1;i<numPoints;i++) {
		if(p[i].z<fl){
	        list.addSegment({x0: p[i-1]._x,
                            y0: p[i-1]._y,
                            x1: p[i]._x,
                            y1: p[i]._y,
                            segmentLength: 16,
                            phase: Math.random()
            });
        }
	}
}
