package upwm.fractals;

import java.util.Arrays;
import java.util.List;

public class Julia implements FractalSet {
	public int maxIterations = 75;
	private Complex c = new Complex(-0.8, 0.156);
	
	public Julia() {
		
	}

	public Julia(Complex c) {
		super();
		this.c = c;
	}

	@Override
	public int getMaxIterations() {
		return maxIterations;
	}
	
	@Override
	public int check(Complex p) {
		int i = 0;
		Complex z = p;
		while (z.modulusSqr() < 4 && i < maxIterations) {
			z = z.sqr().add(c);
			i++;
		}
		return i;
	}
	
	@Override
	public String toString() {
		return String.format("Julia(c=%s)", c);
	}

	@Override
	public void setMaxIterations(int iterations) {
		this.maxIterations = iterations;
	}

	@Override
	public boolean hasParams() {
		return true;
	}

	@Override
	public List<String> getAvailableParams() {
		return Arrays.asList("c");
	}

	@Override
	public void setParamValue(String name, Complex c) {
		if(name.equals("c")) {
			this.c = c;
		}
	}
}
