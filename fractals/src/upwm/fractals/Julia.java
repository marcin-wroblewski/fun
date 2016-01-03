package upwm.fractals;

public class Julia implements FractalSet {
	public static int MAX_ITERATIONS = 75;
	private Complex c = new Complex(-0.8, 0.156);
	
	public Julia() {
		
	}

	public Julia(Complex c) {
		super();
		this.c = c;
	}

	@Override
	public int getMaxIterations() {
		return MAX_ITERATIONS;
	}
	
	@Override
	public int check(Complex p) {
		int i = 0;
		Complex z = p;
		while (z.modulusSqr() < 4 && i < MAX_ITERATIONS) {
			z = z.sqr().add(c);
			i++;
		}
		return i;
	}
}
